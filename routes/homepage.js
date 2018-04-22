const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

var ITEMS_ON_PAGE = 6; //maximum no of items on a page

/* GET : HOME PAGE */
router.get('/', function(req, res) {
    res.render('homepage',{user:req.user});
});

/* GET : BROWSE ACTIVE AUCTIONS BY PAGE*/
// eg '/browse/p/2' to get ITEMS_ON_PAGE items on page 2
router.get('/browse/p/:page', function(req, res) {
    if (req.params.page < 1) req.params.page = 1;
    var offset = (req.params.page-1) * ITEMS_ON_PAGE;
    var sqlquery = 'select active_auctions_id,end_time,prod_id,cat_id,seller_id,prod_name,seller_name,no_of_bids from view_active_auctions order by end_time limit ? offset ?';
    db.query(sqlquery,[ITEMS_ON_PAGE,offset], function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

/* GET: BROWSE ACTIVE AUCTIONS BY CATEGORIES PAGE BY PAGE*/
router.get('/browsebycategory/cid/:cat_id/p/:page', function(req, res) {
    if (req.params.page < 1) req.params.page = 1;
    var offset = (req.params.page -1) * ITEMS_ON_PAGE;
    var sqlquery = `select * from view_active_auctions where cat_id = ? order by end_time
                    limit ? offset ?`;
    db.query(sqlquery,[req.params.cat_id, ITEMS_ON_PAGE, offset], function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

/* GET: CATEGORY LIST*/
router.get('/getcategories',function(req,res) {
    var sqlquery = 'select * from category';
    db.query(sqlquery,function (err,result,fields) {
        if (err) throw err;
        res.send(result);
    });
});



module.exports = router;
