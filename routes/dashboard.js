const express = require('express');
const router = express.Router();
const db = require('../config/database.js');
const cel = require('connect-ensure-login');

router.get('/',cel.ensureLoggedIn('/auth/login'),function(req,res){
    // console.log(req.user.user_id);
    var userid = req.user.user_id;
    res.render('cart', {user:req.user})
});
    // res.send('dashboard page'));


//active auctions
router.get('/active',cel.ensureLoggedIn('/auth/login'), function(req, res){
    //active ongoing auctions
    var userid = req.user.user_id;
    var sqlQ1 = 'select active_auctions_id, end_time, prod_id, prod_name, bid_amt from active_ongoing where user_id=?';
    db.query(sqlQ1, [userid], function(err, result, fields){
        // console.log("Active Ongoing");
        // console.log(result);
        res.json(result);
    })



})

//paid auctions
router.get('/paid',cel.ensureLoggedIn('/auth/login'), function(req,res){
    var userid = req.user.user_id;
    //won and already paid auctions
    var sqlQ2 = 'select finished_auctions_id, sold_at_price, timestamp, prod_id, prod_name, status from won where user_id=? and status=1';
    db.query(sqlQ2, [userid], function(err, result, fields){
        // console.log("won and already paid auctions");
        // console.log(result);
        res.json(result);
    })
})


//not yet paid auctions
router.get('/notpaid',cel.ensureLoggedIn('/auth/login'), function(req, res){
    var userid = req.user.user_id;
    //won and yet to pay auctions
    var sqlQ3 = 'select finished_auctions_id, timestamp, prod_id, prod_name, status from won where user_id=? and status=0';
    db.query(sqlQ3, [userid], function(err, result, fields){
        // console.log("won and needs to pay auctions");
        // console.log(result);
        res.json(result)
    })
})



module.exports = router;
