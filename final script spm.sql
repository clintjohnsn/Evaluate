create database spm;
use spm;

CREATE TABLE `category` (
  `cat_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `cat_name` VARCHAR(255) NOT NULL
);

CREATE TABLE `seller` (
  `seller_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `seller_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `email_id` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `zip` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `adrress` VARCHAR(255) NOT NULL
);

CREATE TABLE `product` (
  `prod_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `prod_name` VARCHAR(255) NOT NULL,
  `weight` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` BLOB,
  `stock` INTEGER NOT NULL,
  
	cat_id integer not null,
	foreign key(cat_id) references category(cat_id),
    
    seller_id integer not null,
	foreign key(seller_id) references seller(seller_id)
);

CREATE TABLE `active_auctions` (
  `active_auctions_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `end_time` DATETIME NOT NULL,
	
    prod_id integer,
	foreign key(prod_id) references product(prod_id)
);


CREATE TABLE `raw_demographic` (
  `raw_demographic_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
	prod_id integer,
	foreign key(prod_id) references product(prod_id)
);



CREATE TABLE `user` (
  `user_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_no` VARCHAR(255) NOT NULL,
  `email_id` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `email_verified` BOOLEAN NOT NULL,
  `banned` BOOLEAN NOT NULL,
  `zip` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `ban_end_time` DATETIME,
  `no_of_bans` INTEGER,
  `dob` DATE NOT NULL
);

CREATE TABLE `bid` (
  `bid_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `bid_amt` INTEGER NOT NULL,
 
	user_id integer,
	foreign key(user_id) references user(user_id),
    
    active_auctions_id integer not null,
	foreign key(active_auctions_id) references active_auctions(active_auctions_id),
    
    raw_demographic_id integer not null,
    foreign key(raw_demographic_id) references raw_demographic(raw_demographic_id)
    
);

CREATE TABLE `finished_auctions` (
  `finished_auctions_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `sold_at_price` INTEGER NOT NULL,
  `highest_bid` INTEGER NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `last_order_date` DATETIME NOT NULL,
  
  	user_id integer not null,
	foreign key(user_id) references user(user_id),
    
	prod_id integer not null,
	foreign key(prod_id) references product(prod_id)
  
);


CREATE TABLE `order` (
  `order_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `time` DATETIME NOT NULL,
  `shipping_address` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `zip` VARCHAR(255) NOT NULL,
  `shipping_service` VARCHAR(255) NOT NULL,
  
  finished_auctions_id integer not null,
	foreign key(finished_auctions_id) references finished_auctions(finished_auctions_id)
  
);
