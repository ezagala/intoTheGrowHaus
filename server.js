const createError = require('http-errors');
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require("./routes");
const port = process.env.PORT || '3001';
const passport = require("passport")


const app = express(); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// Add both API and view routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

const uriString = process.env.MONGODB_URI || "mongodb://localhost/intoTheGrowHaus"; 

// Connect to the Mongo DB
mongoose.connect(uriString, (err, res) => {
  if (err) {
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uriString);
    }
});

// Fire up the server 
app.listen(port, () => {
  console.log("Server started on port: " + port ); 
}); 

module.exports = app;