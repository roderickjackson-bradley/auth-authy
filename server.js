// Express Application
var express = require('express');
var app = express();

// Dependencies
var passport = require('passport')
var mongoose = require('mongoose')

// DB Config
const db = require("./config/keys").mongoURI;


// Connect to MonogDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => console.log(err))

var usersRouter = require('./routes/api/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Passport config
require('./config/passport')(passport)

// Passport Middleware
app.use(passport.initialize())

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler ----> May remove also!
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
