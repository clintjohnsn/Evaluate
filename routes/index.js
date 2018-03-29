var express = require('express');
var router = express.Router();
var db = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get all active auctions ordered by nearest end time
router.get('/browsebytime', function(req, res) {
    var sqlquery = 'select * from view_active_auctions order by end_time';
    db.query(sqlquery, function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//get all active auctions for a particular category
router.get('/browsebycategory/:cat_id', function(req, res) {
    var sqlquery = 'select * from view_active_auctions where cat_id = ' + req.params.cat_id + 'order by end_time';
    db.query(sqlquery, function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
