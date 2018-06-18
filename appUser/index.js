const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const fileUpload = require('express-fileupload');
const parse = require('csv-parse');
const nodemailer = require('nodemailer');
var ldapjs = require('ldapjs');

const app = express();
app.use(fileUpload());
app.use(cors());
//const SELECT_ALL_USER_QUERY = 'SELECT * FROM usuarios';

//configurar LDAP
var ldapConfig = {
	pwdUser: '',
	pwdUserPassword: '',
	pwdPolicySubentry: '',
	domain: ''
};

//Opciones de LDAP, conf puerto
var options = {
    uri: 'ldap://localhost:puerto',
    version: 3, 
    starttls: false, 
    connecttimeout: -1,
    timeout: 5000, 
    reconnect: true,
    backoffmax: 32
};

//Raiz de la API
app.get('/', (req, res) => {
	res.send('Redirigirse a /usuarios')
});

//Conf de BD, conf datos de BD
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'webapi'
});

//Conexion a la BD
connection.connect(err => {
	if(err) {
		return err;
	}
});

//API listado de usuarios
app.get('/usuarios/list', (req,res ) => {
	connection.query(SELECT_ALL_USER_QUERY, (err, results) =>{
		if(err) {
			return res.send(err)
		}else{
			return res.json({
				data: results
			})
		}
	});
});



//API creacion de Usuarios
app.post('/usuarios/add', function (req, res) {
	if(!req.files)
		return res.status(400).send('No se pudo cargar el archivo');
	let file = req.files.file;
	file.mv('./tmp/usuarios.csv', function (err) {
		if(err)
			return res.status(500).send(err);		
	});

	fs.readFile('./tmp/usuarios.csv', {enconding: 'utf-8'}, function(err, csvData){
		if(err){
			console.log(err);
		}
		parse(csvData, {delimiter: ';'}, function(err, data){
			if (err) {
				console.log(err);
			}else{
				for (i = 0; i < data.length; i++) {
    				var usuario = data[i];
    				var pass= generarPass();
    				var userId =  usuario[0]+'.'+usuario[1];
					const INSERT_USER_QUERY = `INSERT INTO usuarios (nombre, usuario, apellido ,email, pass) 
												VALUES ('${usuario[0]}', '${userId}', '${usuario[1]}', '${usuario[2]}', SHA('${pass}'))`; 
					connection.query(INSERT_USER_QUERY, (err, results) =>{
						if(err){
							return res.send(err);
						}else{							
							addUserLdap(userId,usuario[2], pass);
							enviarMail(usuario[2], userId, pass);
						}					
					});
				}
				res.send('Usuarios creados con exito');			
			}
		});
	});	
});

//Enviar mail a cuentas del CSV
function enviarMail(email, usuario, pass){

	exports.sendEmail = function(req, res){
		var transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        user: 'mailapiml@hotmail.com',
		        pass: 'BKink4461'
		    }
		});
		// Definimos el email
		var mailOptions = {
		    from: 'mailapiml@hotmail.com',
		    to: email,
		    subject: 'Registro de usuario',
		    html: '<p>Usuario: '+usuario+' </p>'+
		    	'<p>Contraseña : '+pass+' </p>'+
		    '<a href="http://localhost:3000/usuarios/count">Ingrese a este aqui para cambiar su contraseña.</a>'
		};
		// Enviamos el email
		transporter.sendMail(mailOptions, function(error, info){
		    if (error){
		        console.log(error);       
		    } else {
		        console.log("Email enviado con exito");        
		    }
		});
	};
}

//Generar pass random
function generarPass (){
	var str = '';
	var ref = 'abcdefghijklmnñopqrstuvwxyz12345678';
	for (var i=0; i<=8; i++)
	{
		str += ref.charAt(Math.floor(Math.random()*ref.length));		
	}
	return str;
}

//Creacion user LDAP
let addUserLdap = (userId, mail, password) => {
  return new Promise((resolve, reject) => {
    const ldapClient = ldapjs.createClient(ldapOptions);

    ldapClient.bind(
      ldapConfig.pwdUser,
      ldapConfig.pwdUserPassword,
      (err) => {

        if (err) return reject(err);

        var newUser = {         
          cn: userId,
          userPassword: password,  
          email: mail,
          objectClass: ["person", "organizationalPerson", "inetOrgPerson"],
          pwdPolicySubentry: ldapConfig.pwdPolicySubentry
        };
       
        ldapClient.add(
          'cn=' + userId + ',' + ldapConfig.domain, newUser,
          (err, response) => {
            if (err) return reject(err);
            return resolve(response);
          }
        );
      }
    );
  });
}

//Redireccion a cambio de contraseña
app.get('/usuarios/count', function (req, res) {
  	if (req.url == '/usuarios/count') {
	    res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<form action="count" method="post" enctype="multipart/form-data">');
		res.write('<p>Usuario:<input type="text" name="usuario"></p><br>');
		res.write('<p>Contraseña:<input type="password" name="password"></p><br>');
		res.write('<p>Nueva contraseña: <input type="password" name="passwordNueva"></p><br>');
		res.write('<input type="submit">');
		res.write('</form>');
		return res.end();
	}	
});

app.post('/usuarios/count', function (req, res) {
  	if (req.url == '/usuarios/count') {
	    var usuario = req.body.usuario;
	    var password = req.body.password;
	    var passwordNueva = req.body.passwordNueva;
	    cambiarPass(usuario, password, passwordNueva);
	    const UPDATE_USER_QUERY = `UPDATE usuarios SET pass=SHA('${passwordNueva}') WHERE usuario='${usuario}'`  							 
		connection.query(UPDATE_USER_QUERY, (err, results) =>{
			if(err){
				return res.send(err);
			}				
		});
		return res.end();
	}	
});

//Cambiar contraseña
let cambiarPass = (userId, password, passwordNueva) => {
  return new Promise((resolve, reject) => {
    const ldapClient = ldapjs.createClient(ldapOptions);
    ldapClient.bind(
      'cn=' + userId + ',' + ldapConfig.domain,
      passwordOld,
      err => {
        if (err) return reject(err);
        ldapClient.modify(getDomainString(userId),
          [
            new ldapjs.Change({
              operation: 'replace',
              modification: { userPassword: passwordNueva}
            })
          ],
          (err) => {
            if (err) reject(err);
            return resolve(true);
          }
        );
      }
    );
  });
}

//Conf de puerto
app.listen(4000, () => {
	console.log('Escuchando puerto 4000');
});