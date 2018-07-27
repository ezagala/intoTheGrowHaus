'use strict';

var passport = require('passport');
const db = require("./models");
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./config');
require('dotenv').config()


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