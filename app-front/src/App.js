import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { post } from 'axios';

class App extends Component {

  //Constructor
  constructor(props){
    super(props);
    this.state = {
      usuarios: [],
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange= this.onChange.bind(this)
    this.fileUpload= this.fileUpload.bind(this)
  }


  //Asigna el form al estado antes de enviarse
  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file).then((response)=>{
      alert('Usuarios creados correctamente!');
    })
  }
  
  //Toma los cambios del input file
  onChange(e){
    this.setState({file:e.target.files[0]})
  }

  //Llamo a la API y paso el form
  fileUpload(file){
    const url = 'http://localhost:4000/usuarios/add';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  
  //render de index
  render() {
    const { usuarios } = this.state; 
    return (
      <div className="App">
      <h1>'Bienvenidos'</h1>  
       <div>      
       <h3>Cargar nuevos usuarios</h3>
       <form onSubmit={this.onFormSubmit} >
          <input 
            placeholder='Seleccione el archivo CSV' 
            type='file'             
            id='archivo'
            onChange={this.onChange} />
          <br />
          <br />
          <button type='submit'>Crear usuarios</button> 
       </form>               
       </div>
      </div>
    );
  }
}

export default App;
