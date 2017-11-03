/*
SQLyog Ultimate v8.55 
MySQL - 5.5.43-log : Database - hibernateeg
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hibernateeg` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `hibernateeg`;

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `salary` double NOT NULL,
  `data` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`,`password`,`address`,`salary`,`data`) values (3,'shanu','1234','test3',10002,'1254');

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `salary` double NOT NULL,
  `ssn` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `employee` */

insert  into `employee`(`id`,`name`,`password`,`address`,`salary`,`ssn`) values (1,'shahima','1234','test1se',11111,'1001'),(2,'shahim','1234','test2',200033,'1001');

/*Table structure for table `employee_roles` */

DROP TABLE IF EXISTS `employee_roles`;

CREATE TABLE `employee_roles` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `employee_roles` */

insert  into `employee_roles`(`id`,`name`,`role_name`) values (1,'shahima','ADMIN'),(2,'shahim','ADMIN'),(3,'shanu','USER');

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `login` */

insert  into `login`(`id`,`name`,`password`) values (1,'shahima','$shiro1$SHA-256$500000$skHbSYBH1Y+rDU81nqZkvA==$0kLXuSecA18BwI8K9yy+HB0zcayxo5BIbCwGdMDY+1c='),(2,'shahim','$shiro1$SHA-256$500000$KimJHtOPAAc/ULGrCTA4uw==$XpVTa/iJCFBwXu6KOgR92MKkpcaedhT5iWeG6m0G1Vo='),(3,'shanu','$shiro1$SHA-256$500000$gauKmC9sGRYrjrSmA1acEA==$Op28QopBXhggJ2zUa5HWkWMKlCueBqZFyGStP9/UxK4=');

/*Table structure for table `roles_permissions` */

DROP TABLE IF EXISTS `roles_permissions`;

CREATE TABLE `roles_permissions` (
  `role_name` varchar(20) NOT NULL,
  `permission` varchar(30) NOT NULL,
  KEY `RP_1` (`role_name`),
  KEY `RP_2` (`permission`),
  CONSTRAINT `RP_1` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`),
  CONSTRAINT `RP_2` FOREIGN KEY (`permission`) REFERENCES `permissions` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `roles_permissions` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
