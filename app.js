const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

//load secrets from .env
require('dotenv').config();

//load route modules
var homepage = require('./routes/homepage');
var users = require('./routes/users');
var products = require('./routes/products');
var authRoutes = require('./routes/auth-routes');
var dashboard = require('./routes/dashboard');
var payment  = require('./routes/payment');
//configure passport
var passportSetup = require('./config/passport-config')

//initialize app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// set up session cookies
app.use(cookieSession({
    // age = 1 day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//use routes
app.use('/', homepage);
app.use('/users', users);
app.use('/products',products);
app.use('/auth',authRoutes);
app.use('/dashboard', dashboard);
app.use('/payment', payment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // res.redirect('/');
});

module.exports = app;
