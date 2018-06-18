CREATE DATABASE  IF NOT EXISTS `webapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `webapi`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: webapi
-- ------------------------------------------------------
-- Server version	5.5.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idusarios` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `nombre` varchar(45) CHARACTER SET latin1 NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `pass` varchar(40) CHARACTER SET latin1 NOT NULL,
  `estado` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`idusarios`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'','Manuel','','manugonza13hotmail.com','','\0'),(2,'','Lucas','','lucas13hotmail.com','','\0'),(3,'','Matias','','matias13hotmail.com','','\0'),(4,'','Bryan','','bryancabeza94hotmail.com','','\0'),(5,'','Andres','','carloandrehotmail.com','','\0'),(6,'','Manuel, gonzalez, manugonza13@hotmail.com,','','Manuel, gonzalez, manugonza13@hotmail.com,','','\0'),(7,'','Manuel, gonzalez, manugonza13@hotmail.com,','','Manuel, gonzalez, manugonza13@hotmail.com,','','\0'),(8,'','Manuel, gonzalez, manugonza13@hotmail.com,','','Manuel, gonzalez, manugonza13@hotmail.com,','','\0'),(9,'','Manuel, gonzalez, manugonza13@hotmail.com,','','Manuel, gonzalez, manugonza13@hotmail.com,','','\0'),(10,'','Manuel, gonzalez, manugonza13@hotmail.com','','Lucas, Deccia, manugonza13@hotmail.com','','\0'),(11,'','Manuel','',' gonzalez','','\0'),(12,'','Manuel','',' manugonza13@hotmail.com','','\0'),(13,'','Lucas','',' manugonza13@hotmail.com','','\0'),(14,'','Manuel','',' manugonza13@hotmail.com','','\0'),(15,'','Manuel','',' manugonza13@hotmail.com','','\0'),(16,'','Manuel','',' manugonza13@hotmail.com','','\0'),(17,'','Manuel','',' manugonza13@hotmail.com','','\0'),(18,'','Manuel','',' manugonza13@hotmail.com','','\0'),(19,'','Lucas','',' manugonza13@hotmail.com','','\0'),(20,'','Manuel','',' manugonza13@hotmail.com','','\0'),(21,'','Manuel','',' manugonza13@hotmail.com','','\0'),(22,'','Manuel','',' manugonza13@hotmail.com','','\0'),(23,'','Manuel','',' manugonza13@hotmail.com','','\0'),(24,'','Manuel','',' manugonza13@hotmail.com','','\0'),(25,'','Lucas','',' manugonza13@hotmail.com','','\0'),(26,'','Manuel','',' manugonza13@hotmail.com','','\0'),(27,'','Manuel','',' manugonza13@hotmail.com','','\0'),(28,'','Manuel','',' manugonza13@hotmail.com','','\0'),(29,'','Manuel','',' manugonza13@hotmail.com','','\0'),(30,'','Manuel','',' manugonza13@hotmail.com','','\0'),(31,'','Lucas','',' manugonza13@hotmail.com','','\0'),(32,'','Manuel','',' manugonza13@hotmail.com','','\0'),(33,'','Manuel','',' manugonza13@hotmail.com','','\0'),(34,'','Manuel','',' manugonza13@hotmail.com','','\0'),(35,'','Manuel','',' manugonza13@hotmail.com','','\0'),(36,'','Manuel',' gonzalez',' manugonza13@hotmail.com','c','\0'),(37,'','Lucas',' Deccia',' manugonza13@hotmail.com','c','\0'),(38,'','Manuel',' gonzalez',' manugonza13@hotmail.com','i','\0'),(39,'','Manuel',' gonzalez',' manugonza13@hotmail.com','g','\0'),(40,'','Manuel',' gonzalez',' manugonza13@hotmail.com','o','\0'),(41,'','Manuel',' gonzalez',' manugonza13@hotmail.com','x','\0'),(42,'','Manuel',' gonzalez',' manugonza13@hotmail.com','4','\0'),(43,'','Lucas',' Deccia',' manugonza13@hotmail.com','z','\0'),(44,'','Manuel',' gonzalez',' manugonza13@hotmail.com','s3lq53jv','\0'),(45,'','Lucas',' Deccia',' manugonza13@hotmail.com','4ifomw67','\0'),(46,'','Manuel',' gonzalez',' manugonza13@hotmail.com','b7ezyxck','\0'),(47,'','Lucas',' Deccia',' manugonza13@hotmail.com','bkvlff44','\0'),(48,'','Manuel',' gonzalez',' manugonza13@hotmail.com','kxahocnh','\0'),(49,'','Manuel',' gonzalez',' manugonza13@hotmail.com','samwnjtn','\0'),(50,'','Manuel',' Gonzalez',' manugonza13@hotmail.com','af97fa2eab888060e9ab9a597b54146789b6af5b','\0');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-18  0:10:44
