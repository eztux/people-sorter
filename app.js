const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

require("dotenv").config()


var app = express();

// Connect to DB
var connectionString = `mongodb://localhost:27017/people-sorter`
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if(err)
    console.log(err)
  else
    console.log("connected")
})

console.log(connectionString)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peopleRouter = require('./routes/people');
var sessionRouter = require('./routes/sessions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/people', peopleRouter);
app.use('/sessions', sessionRouter);

console.log("loaded routers")

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
  res.render('error');
});

module.exports = app;
