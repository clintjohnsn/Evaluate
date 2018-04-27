const express = require('express');
const router = express.Router();
const db = require('../config/database.js');
const MINIMUM_AMOUNT =  99;

//authentication check
const authCheck = function(req, res, next){
    if(!req.user){
        res.send('user not logged in');
    } else if (req.user.banned == 1) {
        res.send('banned user');
    }else{
        next();
    }
};


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

/* POST: bid on an active auction */
router.post('/bid',authCheck,function (req,res) {
    var userid = parseInt(req.user.user_id);
    var bid_amt = parseInt(req.body.bid);
    var active_auctions_id = parseInt(req.body.auctionid);
    var sqlquery = "insert into bid values(null, ?,?,?,null)";
    if (bid_amt < MINIMUM_AMOUNT){
        //check if amount less than the Minimum
        res.send('bid amount is less than Minimum');
    }else{
        //add row to bid table
        db.query(sqlquery,[bid_amt, userid, active_auctions_id],function(err,result,fields){
            res.json(result);
        });
    }
});

module.exports = router;
