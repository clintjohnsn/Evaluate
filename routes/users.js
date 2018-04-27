const express = require('express');
const router = express.Router();
const db = require('../config/database.js');
const cel = require('connect-ensure-login');

/* GET THE SETTINGS PAGE */
router.get('/settings',cel.ensureLoggedIn('/auth/login'), function(req, res, next) {
    /*  ensureLoggedIn checks if the user is logged in, if not, redirects to /auth/LOGIN
        the page is stored in the session cookie in 'ReturnTo', and after signing in user is redirected to ReturnTo address
        if User is already logged in, continue to render SETTINGS
    */
    res.render('settings', {
        user: req.user
    });

});

/* POST: UPDATE THE USER SETTINGS */
router.post('/settings/update', cel.ensureLoggedIn('/auth/login'), function(req, res, next) {

        // phone_no, zip, city,state,address,dob
        sqlquery = "update user set phone_no=?, zip=?, city=?, state=?, address=?, dob=? where user_id=?";
        db.query(sqlquery, [req.body.phoneno, req.body.zip, req.body.city, req.body.state, req.body.address, req.body.dob, req.user.user_id], function(err, result, fields) {
            res.json(result);
        });

});

/* GET request to get all user details */
router.get('/getdetails', cel.ensureLoggedIn('auth/login'),function (req, res, next) {
    sqlquery = "select * from user where user_id=?";
    db.query(sqlquery,[req.user.user_id], function(err,result,fields){
        res.json(result);
    });
});

module.exports = router;
