'use strict';

const passport = require('passport');
const db = require("./models");
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config');
const dotenv = require('dotenv')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
  } else if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.development' });
  }



module.exports = function () {

    passport.use(new GoogleTokenStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            db.User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};