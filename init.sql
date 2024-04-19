-- Active: 1713164906685@@127.0.0.1@3306@3t
-- init database
CREATE DATABASE IF NOT EXISTS 3t;

USE 3t;

-- 1.init table admins: DONE
CREATE TABLE IF NOT EXISTS `admins` (
  `ad_id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ad_id`)
);
INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('admin', 'admin', 'ad', 'min', '123', 'admin@gmail.com');

-- 2.init table customers: DONE
CREATE TABLE IF NOT EXISTS `customers` (
  `cus_id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `gender` VARCHAR(255) NULL,
  `dateOfBirth` DATE NULL,
  PRIMARY KEY (`cus_id`)
);
INSERT INTO `customers` (`first_name`, `last_name`, `phone`, `email`, `address`, `gender`, `dateOfBirth`)
VALUES ('Trần Tuấn', 'Thịnh', '0123456789', 'thinh.tran.cit20@eiu.edu.vn', 'Bình Dương', 'male', '2002-05-11');

-- 3.init table decors: DONE
CREATE TABLE IF NOT EXISTS `decors` (
  `decor_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`decor_id`)
);
INSERT INTO `decors` (`description`, `price`) VALUES ('fruits', 10000);
INSERT INTO `decors` (`description`, `price`) VALUES ('stickers', 4000);
INSERT INTO `decors` (`description`, `price`) VALUES ('candles', 5000);

-- 4.init table sizes: DONE
CREATE TABLE IF NOT EXISTS `sizes` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`size_id`)
);
INSERT INTO `sizes` (`size`, `price`) VALUES ('Small', 50000);
INSERT INTO `sizes` (`size`, `price`) VALUES ('Medium', 100000);
INSERT INTO `sizes` (`size`, `price`) VALUES ('Large', 150000);

-- 5.init table flavours: DONE
CREATE TABLE IF NOT EXISTS `flavours` (
  `flavour_id` INT NOT NULL AUTO_INCREMENT,
  `flavour` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`flavour_id`)
);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('strawberry', 10000);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('blackberry', 10000);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('blueberry', 10000);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('chocolate', 10000);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('vanilla', 10000);

-- 6.init table categories: DONE
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`category_id`)
);
INSERT INTO `categories` (`type`, `price`) VALUES ('cake', 10000);
INSERT INTO `categories` (`type`, `price`) VALUES ('cookie', 10000);
INSERT INTO `categories` (`type`, `price`) VALUES ('macaron', 10000);

-- 7.init table shape: DONE
CREATE TABLE IF NOT EXISTS `shapes` (
  `shape_id` INT NOT NULL AUTO_INCREMENT,
  `shape` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`shape_id`)
);
INSERT INTO `shapes` (`shape`, `price`) VALUES ('Round', 12000);
INSERT INTO `shapes` (`shape`, `price`) VALUES ('Square', 10000);

-- 8.init table decor_details: DONE
CREATE TABLE IF NOT EXISTS `decor_details` (
  `decor_detail_id` INT NOT NULL AUTO_INCREMENT,
  `decor_id` INT NOT NULL,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`decor_detail_id`),
  FOREIGN KEY (`decor_id`) REFERENCES `decors`(`decor_id`)
);

-- 9.init table products: DONE
CREATE TABLE IF NOT EXISTS `products` (
  `prod_id` INT NOT NULL AUTO_INCREMENT,
  `decor_detail_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `shape_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  `flavour_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`prod_id`),
  FOREIGN KEY (`decor_detail_id`) REFERENCES `decor_details`(`decor_detail_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`),
  FOREIGN KEY (`shape_id`) REFERENCES `shapes`(`shape_id`),
  FOREIGN KEY (`size_id`) REFERENCES `sizes`(`size_id`),
  FOREIGN KEY (`flavour_id`) REFERENCES `flavours`(`flavour_id`)
);

-- 10.init table des_products: DONE
CREATE TABLE IF NOT EXISTS `des_products` (
  `des_prod_id` INT NOT NULL AUTO_INCREMENT,
  `cus_id` INT NOT NULL,
  `decor_detail_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `shape_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  `flavour_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`des_prod_id`),
  FOREIGN KEY (`cus_id`) REFERENCES `customers`(`cus_id`),
  FOREIGN KEY (`decor_detail_id`) REFERENCES `decor_details`(`decor_detail_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`),
  FOREIGN KEY (`shape_id`) REFERENCES `shapes`(`shape_id`),
  FOREIGN KEY (`size_id`) REFERENCES `sizes`(`size_id`),
  FOREIGN KEY (`flavour_id`) REFERENCES `flavours`(`flavour_id`)
);

-- 11.init table order_details: DONE
CREATE TABLE IF NOT EXISTS `order_details` (
  `order_detail_id` INT NOT NULL,
  `prod_id` INT NOT NULL,
  `prod_quantity` INT NOT NULL,
  `des_prod_id` INT NOT NULL,
  `des_prod_quantity` INT NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  FOREIGN KEY (`prod_id`) REFERENCES `products`(`prod_id`),
  FOREIGN KEY (`des_prod_id`) REFERENCES `des_products`(`des_prod_id`)
);

-- 12.init table orders: DONE
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `order_detail_id` INT NOT NULL,
  `cus_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `delivery_status` VARCHAR(255) NOT NULL,
  `total_unit` DECIMAL(10,2) NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`cus_id`) REFERENCES `customers`(`cus_id`),
  FOREIGN KEY (`order_detail_id`) REFERENCES `order_details`(`order_detail_id`)
);

-- 13.init table inventories: DONE
CREATE TABLE IF NOT EXISTS `inventories` (
  `inventory_id` INT NOT NULL,
  `prod_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`inventory_id`),
  FOREIGN KEY (`prod_id`) REFERENCES `products`(`prod_id`)
);