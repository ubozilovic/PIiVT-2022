/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `piivt_app`;
CREATE DATABASE IF NOT EXISTS `piivt_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `piivt_app`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`, `created_at`, `is_active`) VALUES
	(1, 'admin', '123', '2022-07-13 23:35:05', 1),
	(2, 'administrator', '$2b$10$tsKzqDgq.W6xm9QiS/LHruAz8aiuNpFljmixjoHzKiP.KPCXNXbee', '2022-07-14 00:09:37', 1);

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `category` (`category_id`, `name`) VALUES
	(2, 'Hleb'),
	(4, 'Kolaci'),
	(5, 'Mlecni proizvodi'),
	(9, 'New category'),
	(1, 'Peciva'),
	(8, 'Pi'),
	(6, 'Pice'),
	(3, 'Pite');

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `ingredient_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `ingredient_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `uq_ingredient_name_category_id` (`name`,`category_id`),
  KEY `fk_ingredient_category_id` (`category_id`),
  CONSTRAINT `fk_ingredient_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ingredient` (`ingredient_id`, `name`, `category_id`, `ingredient_type`) VALUES
	(1, 'Belo brasno', 1, 'vegetarijanci,vegani,ostalo'),
	(2, 'heljdino brasno', 1, 'vegetarijanci,vegani,ostalo'),
	(3, 'integralno brasno', 1, 'vegetarijanci,vegani,ostalo'),
	(4, 'coko krem', 1, 'vegetarijanci,ostalo'),
	(5, 'dzem', 1, 'vegetarijanci,vegani,ostalo'),
	(6, 'so', 2, 'vegetarijanci,vegani,ostalo'),
	(7, 'kvacas', 2, 'vegetarijanci,vegani,ostalo'),
	(8, 'brasno', 2, 'vegetarijanci,vegani,ostalo'),
	(9, 'voda', 2, 'vegetarijanci,vegani,ostalo'),
	(10, 'meso', 3, 'ostalo'),
	(11, 'sir', 3, 'vegetarijanci,ostalo'),
	(12, 'krompir', 3, 'vegetarijanci,vegani,ostalo'),
	(13, 'vanila', 4, 'vegetarijanci,vegani,ostalo'),
	(14, 'krem', 4, 'vegetarijanci,ostalo'),
	(16, 'Secer', 2, 'vegetarijanci,vegani,ostalo'),
	(17, 'jogurt', 5, 'vegetarijanci,ostalo'),
	(19, 'mleko', 5, 'vegetarijanci,ostalo');

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `uq_item_name_category_id` (`name`,`category_id`),
  KEY `fk_item_category_id` (`category_id`),
  CONSTRAINT `fk_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `item` (`item_id`, `name`, `description`, `category_id`, `is_active`) VALUES
	(1, 'kifla', 'domaca kifla', 1, 1),
	(2, 'pita', 'pita meso', 3, 1);

DROP TABLE IF EXISTS `item_ingredient`;
CREATE TABLE IF NOT EXISTS `item_ingredient` (
  `item_ingredient_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `ingredient_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`item_ingredient_id`),
  UNIQUE KEY `uq_item_ingredient_item_id_ingredient_id` (`item_id`,`ingredient_id`),
  KEY `fk_ingredient_ingredient_id` (`ingredient_id`),
  CONSTRAINT `fk_ingredient_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`ingredient_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ingredient_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `item_ingredient` (`item_ingredient_id`, `item_id`, `ingredient_id`) VALUES
	(2, 1, 1),
	(1, 1, 4),
	(3, 1, 7),
	(6, 2, 6),
	(5, 2, 8),
	(4, 2, 10);

DROP TABLE IF EXISTS `item_size`;
CREATE TABLE IF NOT EXISTS `item_size` (
  `item_size_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(10) unsigned NOT NULL,
  `size_id` int(10) unsigned NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `kcal` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`item_size_id`),
  UNIQUE KEY `uq_item_size_item_id_size_id` (`item_id`,`size_id`),
  KEY `fk_item_size_size_id` (`size_id`),
  CONSTRAINT `fk_item_size_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_item_size_size_id` FOREIGN KEY (`size_id`) REFERENCES `size` (`size_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `item_size` (`item_size_id`, `item_id`, `size_id`, `price`, `kcal`) VALUES
	(1, 1, 1, 80.00, 333.00),
	(2, 1, 2, 150.00, 450.00),
	(3, 2, 2, 155.00, 610.00);

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_patch` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_file_patch` (`file_patch`) USING HASH,
  KEY `fk_photo_item_id` (`item_id`),
  CONSTRAINT `fk_photo_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `size`;
CREATE TABLE IF NOT EXISTS `size` (
  `size_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`size_id`),
  UNIQUE KEY `uq_size_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `size` (`size_id`, `name`) VALUES
	(2, 'L'),
	(1, 'M'),
	(3, 'XL');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
