use spm;
create view active_auctions_product as
select 	aa.active_auctions_id,
		aa.end_time,
        aa.prod_id,
		p.cat_id,
        p.seller_id,
        c.cat_name,
        s.seller_name 
from active_auctions aa, product p ,category c,seller s
where aa.prod_id=p.prod_id and p.cat_id = c.cat_id and p.seller_id=s.seller_id; 


select * from active_auctions_product;

create view active_auctions_product_bid as
select 	aa.active_auctions_id,
		aa.end_time,
        aa.prod_id,
		p.cat_id,
        p.seller_id,
        c.cat_name,
        s.seller_name,
        count(b.bid_amt)
from active_auctions aa, product p ,category c,seller s, bid b
where aa.prod_id=p.prod_id and p.cat_id = c.cat_id and p.seller_id=s.seller_id and aa.active_auctions_id = b.active_auctions_id; 

select * from active_auctions_product_bid;