var express = require('express');
var router = express.Router();
var db = require('../database.js');

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
            res.send(result[0]);
        }else{
            sqlquery2 = 'select prod_id, prod_name, weight, description, stock from product where prod_id = ?';
            db.query(sqlquery2,[req.params.pid],function (err,result1,fields) {
                if (result1[0]){
                    result1[0].isOnAuction = false;
                    result1[0].prodExist = true;
                    res.send(result1[0]);
                }else{
                    res.send({isOnAuction:false, prodExist:false});
                }
            });
        }
    });
});


module.exports = router;
