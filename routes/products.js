const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

/* SERVE THE PRODUCT PAGE*/
router.get('/',function (req,res) {
    res.render('product_details');
});

/* GET: GET DETAILS OF A PRODUCT BY PRODUCT ID*/
router.get('/pid/:pid',function (req,res) {
    var sqlquery = 'select * from view_active_auctions where prod_id = ?';
    db.query(sqlquery,[req.params.pid],function(err, result, fields) {
        if (result[0]){
            result[0].isOnAuction = true;
            result[0].prodExist = true;
            result[0].user = req.user;
            res.render('product_details',result[0]);
        }else{
            sqlquery2 = 'select prod_id, prod_name, weight, description, stock from product where prod_id = ?';
            db.query(sqlquery2,[req.params.pid],function (err,result1,fields) {
                if (result1[0]){
                    result1[0].isOnAuction = false;
                    result1[0].prodExist = true;
                    result1[0].user = req.user;
                    res.render('product_details',result1[0]);
                }else{
                    res.render('product_details',{isOnAuction:false, prodExist:false, user:req.user});
                }
            });
        }
    });
});


module.exports = router;
