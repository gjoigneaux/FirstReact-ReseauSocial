CREATE SCHEMA `groupomania` ;

USE groupomania;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `messages` (
  `idMESSAGES` int(11) NOT NULL AUTO_INCREMENT,
  `idPARENT` int(11) NOT NULL,
  `idUSERS` int(11) NOT NULL,
  `message` text NOT NULL,
  `username` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `multimedia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idMESSAGES`),
  KEY `idUSERS` (`idUSERS`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;