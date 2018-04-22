const router = require('express').Router();
const passport = require('passport');
const db = require('../config/database.js');

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
router.get('/google',passport.authenticate('google', { scope: ['profile','email'] }));

/* GET: GOOGLE AUTHENTICATE CALLBACK URL*/
router.get('/google/redirect',passport.authenticate('google',{
    successRedirect:'/',
    failureRedirect:'/auth/login'
}));

module.exports = router;
