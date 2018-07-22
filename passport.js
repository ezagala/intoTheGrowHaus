'use strict';

var passport = require('passport');
const db = require("./models");
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./config');

module.exports = function () {

    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            db.User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};