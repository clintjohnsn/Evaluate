const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

router.get('/',function(req,res){
    res.send('dashboard page')
});

module.exports = router;
