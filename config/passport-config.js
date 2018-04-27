const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/database.js');


passport.serializeUser(function(user,done){
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done){
    var searchuserquery = 'select * from user where user_id= ?';
    db.query(searchuserquery, [id], function(err, result, fields) {
        if (err) throw err;
        done(null, result[0])
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        //check if the user exists or is a new user
        var googleid = profile.id;
        var searchuserquery = 'select * from user where googleid=?';
        db.query(searchuserquery, [googleid], function(err, result, fields) {
            if (err) throw err;
            if (result[0]) { //existing user
                var user = result[0]
                console.log(result[0]);
                done(null, result[0]);
            } else {
                //create new user
                var user_name = profile.displayName;
                var email_id = profile.emails[0].value;
                var createquery = "insert into user (user_name,email_id,email_verified,googleid) values (?,?,1,?)";
                db.query(createquery, [user_name, email_id, googleid], function(err, result, fields) {
                    if (err) throw err;
                    //retrieve the newly created record
                    db.query(searchuserquery, [googleid], function(err, result, fields) {
                        if (err) throw err;
                        done(null, result[0])
                    });
                })
            }
        })
    }
));
