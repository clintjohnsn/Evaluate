var express = require('express');
var router = express.Router();
var db = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/browse',function(req,res) {
    db.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
  });
});

module.exports = router;
