-- ----------------------------
-- Table structure for `products`
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description ` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Records of products
-- ----------------------------

INSERT INTO `products` VALUES ('1', 'Iphone', 'Apple Iphone', '1000');
INSERT INTO `products` VALUES ('2', 'IPad', 'Apple IPad', '1200');
INSERT INTO `products` VALUES ('3', 'MacBook', 'Apple MacBook', '2000');


-- ----------------------------
-- Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Records of categories
-- ----------------------------

INSERT INTO `categories` VALUES ('1', 'phones');
INSERT INTO `categories` VALUES ('2', 'tablets');
INSERT INTO `categories` VALUES ('3', 'notebooks');


-- ----------------------------
-- Table structure for `product_category_match`
-- ----------------------------
DROP TABLE IF EXISTS `product_category_match`;
CREATE TABLE `product_category_match` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Records of product_category_match
-- ----------------------------

INSERT INTO `product_category_match` VALUES ('1', '1', '1');
INSERT INTO `product_category_match` VALUES ('2', '2', '2');
INSERT INTO `product_category_match` VALUES ('3', '3', '3');