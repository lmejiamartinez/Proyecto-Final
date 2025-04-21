-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_proyecto
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprendiz_ficha`
--

DROP TABLE IF EXISTS `aprendiz_ficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendiz_ficha` (
  `id_ficha_aprendiz` int unsigned NOT NULL AUTO_INCREMENT,
  `id_ficha` int unsigned NOT NULL,
  `id_usuario` int unsigned NOT NULL,
  `id_empresa` int unsigned NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `alternativa_contrato` varchar(255) NOT NULL,
  `jefe_inmdediato` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_ficha_aprendiz`),
  KEY `fk_apf_empresa__idx` (`id_empresa`),
  KEY `fk_apf_fichas_idx` (`id_ficha`),
  KEY `fk_apf_ficha_ibfk_1_idx` (`id_usuario`),
  CONSTRAINT `aprendiz_ficha_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE,
  CONSTRAINT `fk_apf_empresa_` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `fk_apf_fichas` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendiz_ficha`
--

LOCK TABLES `aprendiz_ficha` WRITE;
/*!40000 ALTER TABLE `aprendiz_ficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendiz_ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bitacoras`
--

DROP TABLE IF EXISTS `bitacoras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacoras` (
  `id_bitacoras` int unsigned NOT NULL AUTO_INCREMENT,
  `id_ficha_aprendiz` int unsigned NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `num_bitacora` int unsigned NOT NULL,
  PRIMARY KEY (`id_bitacoras`),
  KEY `fk_bitacora_aprendiz_idx` (`id_ficha_aprendiz`),
  CONSTRAINT `fk_bitacora_aprendiz` FOREIGN KEY (`id_ficha_aprendiz`) REFERENCES `aprendiz_ficha` (`id_ficha_aprendiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacoras`
--

LOCK TABLES `bitacoras` WRITE;
/*!40000 ALTER TABLE `bitacoras` DISABLE KEYS */;
/*!40000 ALTER TABLE `bitacoras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id_documento` int unsigned NOT NULL AUTO_INCREMENT,
  `id_ficha_aprendiz` int unsigned NOT NULL,
  `tipo_documento` enum('CC','TI','CE') NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `num_documento` int unsigned NOT NULL,
  PRIMARY KEY (`id_documento`),
  KEY `fk_fichaAprendiz_idx` (`id_ficha_aprendiz`),
  CONSTRAINT `fk_doc_aprendiz` FOREIGN KEY (`id_ficha_aprendiz`) REFERENCES `aprendiz_ficha` (`id_ficha_aprendiz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(25) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `nit` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `id_ficha` int unsigned NOT NULL AUTO_INCREMENT,
  `num_programa` int unsigned NOT NULL,
  `termino` varchar(60) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id_notificaciones` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `estado` enum('leido','no leido') NOT NULL,
  `categoria` enum('info','success','warning','error') NOT NULL,
  `fecha` date NOT NULL,
  `mensaje` text NOT NULL,
  `titulo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_notificaciones`),
  KEY `fk_notif_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_notif_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordtoken`
--

DROP TABLE IF EXISTS `passwordtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordtoken` (
  `id_token` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(100) NOT NULL,
  `expiresAt` date NOT NULL,
  `id_usuario` int unsigned NOT NULL,
  `createdAt` date NOT NULL,
  `updateAt` date NOT NULL,
  PRIMARY KEY (`id_token`),
  KEY `fk_usuario_token_idx` (`id_usuario`),
  CONSTRAINT `fk_usuario_token` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordtoken`
--

LOCK TABLES `passwordtoken` WRITE;
/*!40000 ALTER TABLE `passwordtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `passwordtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud_ficha`
--

DROP TABLE IF EXISTS `solicitud_ficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_ficha` (
  `id_solicitud_ficha` int unsigned NOT NULL AUTO_INCREMENT,
  `estado` tinyint NOT NULL,
  `nombre_solicitud` varchar(50) NOT NULL,
  `id_ficha` int unsigned NOT NULL,
  PRIMARY KEY (`id_solicitud_ficha`),
  KEY `fk_sol_ficha_idx` (`id_ficha`),
  CONSTRAINT `fk_sol_ficha` FOREIGN KEY (`id_ficha`) REFERENCES `fichas` (`id_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud_ficha`
--

LOCK TABLES `solicitud_ficha` WRITE;
/*!40000 ALTER TABLE `solicitud_ficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud_ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `estado` tinyint NOT NULL DEFAULT '1',
  `nombre` varchar(50) NOT NULL,
  `tipo_documento` enum('CC','TI','CE') NOT NULL DEFAULT 'CC',
  `correo` varchar(100) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `identificacion` int unsigned NOT NULL,
  `rol` enum('Aprendiz','Instructor') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `identificacion_UNIQUE` (`identificacion`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `correo_2` (`correo`),
  UNIQUE KEY `correo_3` (`correo`),
  UNIQUE KEY `correo_4` (`correo`),
  UNIQUE KEY `correo_5` (`correo`),
  UNIQUE KEY `correo_6` (`correo`),
  UNIQUE KEY `correo_7` (`correo`),
  UNIQUE KEY `correo_8` (`correo`),
  UNIQUE KEY `correo_9` (`correo`),
  UNIQUE KEY `correo_10` (`correo`),
  UNIQUE KEY `correo_11` (`correo`),
  UNIQUE KEY `correo_12` (`correo`),
  UNIQUE KEY `correo_13` (`correo`),
  UNIQUE KEY `correo_14` (`correo`),
  UNIQUE KEY `correo_15` (`correo`),
  UNIQUE KEY `correo_16` (`correo`),
  UNIQUE KEY `correo_17` (`correo`),
  UNIQUE KEY `correo_18` (`correo`),
  UNIQUE KEY `correo_19` (`correo`),
  UNIQUE KEY `correo_20` (`correo`),
  UNIQUE KEY `correo_21` (`correo`),
  UNIQUE KEY `correo_22` (`correo`),
  UNIQUE KEY `correo_23` (`correo`),
  UNIQUE KEY `correo_24` (`correo`),
  UNIQUE KEY `correo_25` (`correo`),
  UNIQUE KEY `correo_26` (`correo`),
  UNIQUE KEY `correo_27` (`correo`),
  UNIQUE KEY `correo_28` (`correo`),
  UNIQUE KEY `correo_29` (`correo`),
  UNIQUE KEY `correo_30` (`correo`),
  UNIQUE KEY `correo_31` (`correo`),
  UNIQUE KEY `correo_32` (`correo`),
  UNIQUE KEY `correo_33` (`correo`),
  UNIQUE KEY `correo_34` (`correo`),
  UNIQUE KEY `correo_35` (`correo`),
  UNIQUE KEY `correo_36` (`correo`),
  UNIQUE KEY `correo_37` (`correo`),
  UNIQUE KEY `correo_38` (`correo`),
  UNIQUE KEY `correo_39` (`correo`),
  UNIQUE KEY `correo_40` (`correo`),
  UNIQUE KEY `correo_41` (`correo`),
  UNIQUE KEY `correo_42` (`correo`),
  UNIQUE KEY `correo_43` (`correo`),
  UNIQUE KEY `correo_44` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,'Juan manuel','CC','juaManuel@gmail.com','$2b$10$Ht4ZyQxWmG7wwbVH9wh2heVTV816GY7kdpK5aFTwIYNmS5Sq3I74u',1123433504,'Instructor','2025-04-19 16:22:56','2025-04-19 16:22:56'),(2,1,'Fernanda Lo','CC','Fernanda@gmail.com','$2b$10$8lUC3EaQEwLGh9.x6ePlkuX/BNTfyJq8r0d6PRl0Zkw0j36D1fsZ.',1167723,'Aprendiz','2025-04-19 16:59:55','2025-04-19 16:59:55'),(3,1,'Luisa Fernanda','CC','lmejia25@gmail.com','$2b$10$rARAIHtOiJPt6mD2uyS6zOkAmSnRZuaZFc4RyluZpLU/a4nZuKp36',1123433704,'Instructor','2025-04-19 17:17:39','2025-04-19 17:17:39'),(4,1,'Hernan Gonzales','CC','Hernan@gmail.com','$2b$10$y/ypA/lcvmhRx2x/jt7nI.USh7kK6uHqQABY1G37SyJetyOXrUXEa',2965392,'Aprendiz','2025-04-20 03:23:43','2025-04-20 03:23:43');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitas`
--

DROP TABLE IF EXISTS `visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitas` (
  `id_visitas` int NOT NULL AUTO_INCREMENT,
  `id_ficha_aprendiz` int unsigned NOT NULL,
  `id_instructor` int unsigned NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `motivo` text NOT NULL,
  `tipo` enum('Presencial','Virtual') NOT NULL,
  `estado` enum('Pendiente','Aprobada','Cancelada') NOT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fin` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_visitas`),
  KEY `fk_visita_aprendiz_idx` (`id_ficha_aprendiz`),
  KEY `visitas_ibfk_86_idx` (`id_instructor`),
  CONSTRAINT `visitas_ibfk_153` FOREIGN KEY (`id_ficha_aprendiz`) REFERENCES `aprendiz_ficha` (`id_ficha_aprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visitas_ibfk_154` FOREIGN KEY (`id_instructor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitas`
--

LOCK TABLES `visitas` WRITE;
/*!40000 ALTER TABLE `visitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bd_proyecto'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 10:53:28
