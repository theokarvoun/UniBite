-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: Unibite
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `advert_id` int NOT NULL,
  `rated_by_customer_id` int NOT NULL,
  `description` text,
  `stars` int DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `advert_id` (`advert_id`),
  KEY `rated_by_customer_id` (`rated_by_customer_id`),
  CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`advert_id`) REFERENCES `advertisment` (`advert_id`),
  CONSTRAINT `Rating_ibfk_2` FOREIGN KEY (`rated_by_customer_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
INSERT INTO `Rating` VALUES (1,1,2,'Very tasty sandwich and fresh ingredients.',5),(2,2,5,'Pancakes were amazing but very sweet.',4),(3,4,1,'Perfect breakfast portion.',5),(4,6,3,'Fish was crispy and well cooked.',4),(5,8,6,'Creamy pasta with great flavor.',5),(6,5,8,'Healthy and refreshing salad.',4);
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_username` varchar(50) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_username` (`admin_username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin1','secure_admin_pw_1'),(2,'moderator','secure_admin_pw_2');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advertisment`
--

DROP TABLE IF EXISTS `advertisment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertisment` (
  `advert_id` int NOT NULL AUTO_INCREMENT,
  `creator_student_id` int NOT NULL,
  `customer_student_id` int DEFAULT NULL,
  `food_name` varchar(64) DEFAULT NULL,
  `food_photo` varchar(255) DEFAULT NULL,
  `food_description` text,
  `food_amount` int DEFAULT NULL,
  `delivery_location` varchar(64) DEFAULT NULL,
  `delivery_time` time DEFAULT NULL,
  `date_of_creation` date DEFAULT NULL,
  `state_of_ad` enum('ACTIVE','INACTIVE','DELETED') DEFAULT NULL,
  PRIMARY KEY (`advert_id`),
  KEY `creator_student_id` (`creator_student_id`),
  KEY `customer_student_id` (`customer_student_id`),
  CONSTRAINT `advertisment_ibfk_1` FOREIGN KEY (`creator_student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `advertisment_ibfk_2` FOREIGN KEY (`customer_student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertisment`
--

LOCK TABLES `advertisment` WRITE;
/*!40000 ALTER TABLE `advertisment` DISABLE KEYS */;
INSERT INTO `advertisment` VALUES (1,1,2,'Chicken Club Sandwich','chicken_sandwich.jpg','Triple-layer sandwich with grilled chicken, lettuce and mayo.',3,'Campus Library','13:00:00','2026-05-10','ACTIVE'),(2,3,5,'Nutella Pancakes','nutella_pancakes.jpg','Homemade pancakes with Nutella and crushed peanuts.',2,'Dorm Building A','10:30:00','2026-05-11','ACTIVE'),(3,2,NULL,'Shrimp Sushi Box','sushi_box.jpg','Fresh sushi platter with shrimp and soy sauce.',1,'Engineering Hall','18:15:00','2026-05-12','ACTIVE'),(4,4,1,'Cheese Omelette','omelette.jpg','Three-egg omelette with cheddar cheese.',2,'Student Center','09:45:00','2026-05-13','ACTIVE'),(5,5,NULL,'Vegan Salad Bowl','vegan_salad.jpg','Fresh vegan salad with sesame dressing.',4,'Science Building','14:00:00','2026-05-14','ACTIVE'),(6,6,3,'Fish and Chips','fish_chips.jpg','Crispy fried fish with fries and mustard sauce.',2,'Main Cafeteria','19:00:00','2026-05-15','INACTIVE'),(7,7,NULL,'Peanut Butter Cookies','cookies.jpg','Soft baked peanut butter cookies.',8,'Arts Building','16:00:00','2026-05-16','ACTIVE'),(8,8,6,'Creamy Mushroom Pasta','mushroom_pasta.jpg','Creamy pasta with mushrooms and parmesan.',3,'North Dorms','20:00:00','2026-05-17','ACTIVE'),(9,1,NULL,'fds','1779193836137-170316856.png','fsd',1,'231',NULL,'2026-05-19','ACTIVE');
/*!40000 ALTER TABLE `advertisment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergy`
--

DROP TABLE IF EXISTS `allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergy` (
  `allergy_id` int NOT NULL AUTO_INCREMENT,
  `advert_id` int NOT NULL,
  `type_id` int NOT NULL,
  PRIMARY KEY (`allergy_id`),
  KEY `advert_id` (`advert_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `allergy_ibfk_1` FOREIGN KEY (`advert_id`) REFERENCES `advertisment` (`advert_id`),
  CONSTRAINT `allergy_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `allergy_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy`
--

LOCK TABLES `allergy` WRITE;
/*!40000 ALTER TABLE `allergy` DISABLE KEYS */;
INSERT INTO `allergy` VALUES (1,1,2),(2,1,7),(3,2,2),(4,2,7),(5,2,11),(6,2,4),(7,3,3),(8,3,13),(9,3,5),(10,3,12),(11,4,4),(12,4,7),(13,5,12),(14,5,9),(15,6,5),(16,6,2),(17,6,9),(18,7,2),(19,7,11),(20,7,4),(21,7,7),(22,8,2),(23,8,7),(24,9,8);
/*!40000 ALTER TABLE `allergy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergy_type`
--

DROP TABLE IF EXISTS `allergy_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergy_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy_type`
--

LOCK TABLES `allergy_type` WRITE;
/*!40000 ALTER TABLE `allergy_type` DISABLE KEYS */;
INSERT INTO `allergy_type` VALUES (1,'Celery'),(3,'Crustaceans'),(4,'Eggs'),(5,'Fish'),(2,'Gluten'),(6,'Lupin'),(7,'Milk'),(8,'Molluscs'),(9,'Mustard'),(11,'Peanuts'),(12,'Sesame Seeds'),(13,'Soy'),(14,'Sulphur dioxide and sulphites'),(10,'Tree Nuts');
/*!40000 ALTER TABLE `allergy_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_ad`
--

DROP TABLE IF EXISTS `request_ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_ad` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `advert_id` int DEFAULT NULL,
  `request_accepted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`request_id`),
  KEY `student_id` (`student_id`),
  KEY `advert_id` (`advert_id`),
  CONSTRAINT `request_ad_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `request_ad_ibfk_2` FOREIGN KEY (`advert_id`) REFERENCES `advertisment` (`advert_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_ad`
--

LOCK TABLES `request_ad` WRITE;
/*!40000 ALTER TABLE `request_ad` DISABLE KEYS */;
INSERT INTO `request_ad` VALUES (1,2,1,1),(2,5,2,1),(3,1,3,0),(4,3,4,1),(5,4,1,0),(6,6,6,1),(7,8,5,1),(8,2,7,0);
/*!40000 ALTER TABLE `request_ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(64) DEFAULT NULL,
  `student_email` varchar(64) DEFAULT NULL,
  `student_password` varchar(255) DEFAULT NULL,
  `advertisments_completed` int DEFAULT '0',
  `points` int DEFAULT '5',
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `student_email` (`student_email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Alice Johnson','alice@unibite.com','hashed_pw_1',3,25),(2,'Bob Smith','bob@unibite.com','hashed_pw_2',1,10),(3,'Charlie Brown','charlie@unibite.com','hashed_pw_3',5,40),(4,'Diana Prince','diana@unibite.com','hashed_pw_4',0,5),(5,'Ethan Walker','ethan@unibite.com','hashed_pw_5',2,15),(6,'Fiona Davis','fiona@unibite.com','hashed_pw_6',4,30),(7,'George Miller','george@unibite.com','hashed_pw_7',1,8),(8,'Hannah Lee','hannah@unibite.com','hashed_pw_8',6,50);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-19 15:32:23
