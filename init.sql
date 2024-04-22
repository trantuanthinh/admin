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
INSERT  INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('Thinh', 'admin', 'Thinh', 'Tran', '234', 'tran.tuan.thinh.0125@gmail.com');
INSERT  INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('Nguyen', 'admin', 'Nguyen', 'Nguyen', '345', 'nguyen.nguyen.cit22@gmail.com');
INSERT  INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('My', 'admin', 'My', 'Tran', '456', 'my.tran.cit22@gmail.com');

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
INSERT INTO `customers` (`first_name`, `last_name`, `phone`, `email`, `address`, `gender`, `dateOfBirth`)
VALUES ('Nguyen Minh', 'Nguyen', '234567891', 'nguyen.nguyen.cit22@gmail.com', 'Bình Dương', 'female', '2002-01-01');
INSERT INTO `customers` (`first_name`, `last_name`, `phone`, `email`, `address`, `gender`, `dateOfBirth`)
VALUES ('Trần Tuấn', 'Thịnh', '345678912', 'my.tran.cit22@gmail.com', 'Bình Dương', 'female', '2000-09-09');

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
INSERT INTO `decor_details` (`decor_id`, `unit_price`, `quantity`, `total_price`) VALUES (1, 50.00, 2, 100.00);
INSERT INTO `decor_details` (`decor_id`, `unit_price`, `quantity`, `total_price`) VALUES (2, 30.00, 3, 90.00);
INSERT INTO `decor_details` (`decor_id`, `unit_price`, `quantity`, `total_price`) VALUES (3, 40.00, 1, 40.00);

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
-- INSERT INTO `products` (`name`, `image`, `price`, `email`, `address`, `gender`, `dateOfBirth`)
-- VALUES ('Trần Tuấn', 'Thịnh', '0123456789', 'thinh.tran.cit20@eiu.edu.vn', 'Bình Dương', 'male', '2002-05-11');
INSERT INTO `products` (`decor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `image`, `price`)
VALUES (1, 1, 1, 1, 1, 'Cake', 'cake.jpg', 25.00);
INSERT INTO `products` (`decor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `image`, `price`)
VALUES (2, 2, 2, 2, 2, 'Cookie', 'cookie.jpg', 10.00);
INSERT INTO `products` (`decor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `image`, `price`)
VALUES (3, 3, 3, 3, 3, 'Macaron', 'macarone.jpg', 35.00);


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
INSERT INTO `des_products` (`cus_id`, `decor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
VALUES (1, 1, 1, 1, 1, 1, 'Cake', 25.00);
INSERT INTO `des_products` (`cus_id`, `decor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
VALUES (2, 2, 2, 2, 2, 2, 'Cookie', 10.00);
INSERT INTO `des_products` (`cus_id`, `decor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
VALUES (3, 3, 3, 3, 3, 3, 'Macaron', 35.00);


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
INSERT INTO `order_details` (`order_detail_id`, `prod_id`, `prod_quantity`, `des_prod_id`, `des_prod_quantity`)
VALUES (1, 1, 2, 2, 3);
INSERT INTO `order_details` (`order_detail_id`, `prod_id`, `prod_quantity`, `des_prod_id`, `des_prod_quantity`)
VALUES (2, 1, 3, 1, 1);
INSERT INTO `order_details` (`order_detail_id`, `prod_id`, `prod_quantity`, `des_prod_id`, `des_prod_quantity`)
VALUES (3, 2, 3, 2, 2);

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
INSERT INTO `orders` (`order_detail_id`, `cus_id`, `delivery_status`, `total_unit`, `total_price`)
VALUES (1, 1, 'Pending', 2, 50.00);
INSERT INTO `orders` (`order_detail_id`, `cus_id`, `delivery_status`, `total_unit`, `total_price`)
VALUES (2, 2, 'Shipped', 1, 35.00);
INSERT INTO `orders` (`order_detail_id`, `cus_id`, `delivery_status`, `total_unit`, `total_price`)
VALUES (3, 3, 'Delivered', 3, 30.00);


-- 13.init table inventories: DONE
CREATE TABLE IF NOT EXISTS `inventories` (
  `inventory_id` INT NOT NULL,
  `prod_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`inventory_id`),
  FOREIGN KEY (`prod_id`) REFERENCES `products`(`prod_id`)
);
INSERT INTO `inventories` (`inventory_id`, `prod_id`, `quantity`)
VALUES (1, 1, 50);
INSERT INTO `inventories` (`inventory_id`, `prod_id`, `quantity`)
VALUES (2, 2, 100);
INSERT INTO `inventories` (`inventory_id`, `prod_id`, `quantity`)
VALUES (3, 3, 75);

