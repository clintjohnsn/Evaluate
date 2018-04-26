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
  `image` STRING,
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
use spm;

alter table category auto_increment=101;
insert into category(category.cat_name) values(
	'Furniture'
);

insert into category(category.cat_name) values(
	'Paintings'
);
select * from category;

alter table seller auto_increment=1;
insert into seller(seller_name, phone,email_id,registration_date,zip,city,state,adrress) values(
	'Cloudtail India',
    '120266555',
    'cloudtail@gmail.com',
    curdate(),
    '203207',
    'Dadri',
    'Uttar Pradesh',
    'Snu dadri'
);
insert into seller(seller_name, phone,email_id,registration_date,zip,city,state,adrress) values(
	'Amazing Buy',
    '120266111',
    'amazingbuy123@gmail.com',
    curdate(),
    '201003',
    'Noida',
    'Uttar Pradesh',
    'Sec-18,Noida'
);
select * from seller;

alter table product auto_increment=10;
insert into product(prod_name, weight,description,image,stock,cat_id,seller_id) values(
	'Ancient Table',
    '20Kg',
    'Awesome Table',
    null,
    5,
    101,
    1
);
insert into product(prod_name, weight,description,image,stock,cat_id,seller_id) values(
	'Ancient Chair',
    '10Kg',
    'Awesome Chair',
    null,
    3,
    101,
    2
);

insert into product(prod_name, weight,description,image,stock,cat_id,seller_id) values(
	'The Weeping Woman',
    '100gm',
    'Picasso Painting',
    null,
    1,
    102,
    1
);
insert into product(prod_name, weight,description,image,stock,cat_id,seller_id) values(
	'Mona Lisa',
    '350gm',
    'Original piece by Lenardo Da Vinci',
    null,
    15,
    102,
    2
);
select * from product;

alter table active_auctions auto_increment=1;

insert into active_auctions(end_time,prod_id) values(
	curdate(),
    10
);
insert into active_auctions(end_time,prod_id) values(
	curdate(),
    11
);
insert into active_auctions(end_time,prod_id) values(
	curdate(),
    12
);
insert into active_auctions(end_time,prod_id) values(
	curdate(),
    13
);

alter table user auto_increment=1000;
insert into user(user_name,password,phone_no,email_id,registration_date,email_verified,
banned,zip,city,state,address,ban_end_time,no_of_bans,dob) values(
	'Akash',
    '12345',
	'9871912616',
	'ag@gmail.com',
	curdate(),
    true,
    false,
    '203207',
    'Dadri',
    'Uttar Pradesh',
    'G.T.Road,Dadri',
    null,
    null,
    '1996/10/08'
);

insert into user(user_name,password,phone_no,email_id,registration_date,email_verified,
banned,zip,city,state,address,ban_end_time,no_of_bans,dob) values(
	'Clint',
    '987654',
	'9999999998',
	'cj@gmail.com',
	curdate(),
    false,
    true,
    '201011',
    'Rajiv Chowk',
    'Delhi',
    'Rajiv Chowk,Delhi',
    '2018/04/29 03:46:00',
    6,
    '1998/01/01'
);
select *from user;

alter table finished_auctions auto_increment=1;

insert into finished_auctions(sold_at_price,highest_bid,timestamp,last_order_date,user_id,prod_id) values(
	1200,
    1500,
    curdate(),
    '2018/03/30 11:59:00',
    1000,
    10
);

insert into finished_auctions(sold_at_price,highest_bid,timestamp,last_order_date,user_id,prod_id) values(
	6500,
    8000,
    curdate(),
    '2018/04/12 11:59:00',
    1001,
    12
);
select * from finished_auctions;

alter table `order` auto_increment=200;
insert into `order`(time,shipping_address,state,city,zip,shipping_service,finished_auctions_id) values(
	curdate(),
    'Delhi',
    'Delhi',
    'Delhi',
    '110000',
    'Fed-Ex',
    2
);
insert into `order`(time,shipping_address,state,city,zip,shipping_service,finished_auctions_id) values(
	curdate(),
    'Noida',
    'Uttar Pradesh',
    'Noida',
    '110001',
    'Blue Dart',
    1
);
select * from `order`;

alter table raw_demographic auto_increment=1;
insert into raw_demographic(prod_id) values(
	10
);
insert into raw_demographic(prod_id) values(
	13
);
insert into raw_demographic(prod_id) values(
	11
);
select * from raw_demographic;

alter table bid auto_increment=10;
insert into bid(bid.bid_amt,bid.user_id,bid.active_auctions_id,bid.raw_demographic_id) values(
	1200,
    1000,
    1,
    2
);
insert into bid(bid.bid_amt,bid.user_id,bid.active_auctions_id,bid.raw_demographic_id) values(
	6500,
    1001,
    4,
    3
);
select * from bid;

create view view_active_auctions as
select 	aa.active_auctions_id,
		aa.end_time,
        aa.prod_id,        
		p.cat_id,
        p.seller_id,
        p.prod_name,
        p.weight,
        p.description,
        p.stock,        
        c.cat_name,
        s.seller_name,
        (select count(bid_id) from bid where bid.active_auctions_id = aa.active_auctions_id)
from active_auctions aa, product p ,category c,seller s
where aa.prod_id=p.prod_id and p.cat_id = c.cat_id and p.seller_id=s.seller_id; 

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `spmevaluateadmin`@`spm-evaluate-db-2.c19hzyaelurm.ap-south-1.rds.amazonaws.com` 
    SQL SECURITY DEFINER
VIEW `spm`.`view_active_auctions` AS
    SELECT 
        `aa`.`active_auctions_id` AS `active_auctions_id`,
        `aa`.`end_time` AS `end_time`,
        `aa`.`prod_id` AS `prod_id`,
        `p`.`cat_id` AS `cat_id`,
        `p`.`seller_id` AS `seller_id`,
        `p`.`prod_name` AS `prod_name`,
        `p`.`weight` AS `weight`,
        `p`.`description` AS `description`,
        `p`.`stock` AS `stock`,
        `c`.`cat_name` AS `cat_name`,
        `s`.`seller_name` AS `seller_name`,
        (SELECT 
                COUNT(`spm`.`bid`.`bid_id`)
            FROM
                `spm`.`bid`
            WHERE
                (`spm`.`bid`.`active_auctions_id` = `aa`.`active_auctions_id`)) AS `no_of_bids`
    FROM
        (((`spm`.`active_auctions` `aa`
        JOIN `spm`.`product` `p`)
        JOIN `spm`.`category` `c`)
        JOIN `spm`.`seller` `s`)
    WHERE
        ((`aa`.`prod_id` = `p`.`prod_id`)
            AND (`p`.`cat_id` = `c`.`cat_id`)
            AND (`p`.`seller_id` = `s`.`seller_id`));
            
insert into product values(null, 'Couch','10Kg','real comfy couch',null,10,101,2);
