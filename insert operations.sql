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