'use strict';

const passport = require('passport');
const db = require("./models");
const GoogleTokenStrategy = require('passport-google-token').Strategy;
// const config = require('./config');
require('dotenv').config();

module.exports = function () {

    console.log("the clientID is", process.env.GOOGLE_CLIENT_ID)

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