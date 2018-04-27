const router = require('express').Router();
const passport = require('passport');
const db = require('../config/database.js');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const MINPASSWORDLENGTH = 8;

/* GET: SERVE THE LOGIN PAGE*/
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* GET: LOGOUT THE USER*/
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

/* GET: AUTHENTICATE USING GOOGLE */
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

/* GET: GOOGLE AUTHENTICATE CALLBACK URL*/
router.get('/google/redirect', passport.authenticate('google', {
    // if session has ReturnTo set, then redirect to ReturnTo. else to '/'
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login'
}));

router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var emailid = req.body.email;
    var password = req.body.password;
    // Whatever verifications and checks you need to perform here
    if ((name.length > 0) & (emailid.length > 0) & (password.length > MINPASSWORDLENGTH)) {
        if (validator.isEmail(emailid)) {
            //generate a salt for the user
            bcrypt.genSalt(10, function(err, salt) {
                // if (err) return next(err);
                //hash the password with the salt
                bcrypt.hash(password, salt, function(err, hash) {
                    // if (err) return next(err);
                    var hashedpassword = hash;
                    // Store the user to the database, then send the response
                    var sqlquery = "insert into user (user_name,email_id,password,email_verified) values (?,?,?,0)"
                    db.query(sqlquery, [name, emailid, hashedpassword], function(err, result, fields) {
                        // if (err) throw next(err);
                        res.json(result);
                    });
                });
            });
        }
    }
});

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login'
}));

module.exports = router;
