'use strict';

var passport = require('passport');
const db = require("./models");
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./config');
const dotenv = require('dotenv');



if (process.env && process.env.NODE_ENV) {
    dotenv.config({path: '.env'});
  } else {
    dotenv.config({path: '.env.development'});
  }

require('dotenv').config({path: '.env.development'})


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