var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// mongoose
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://admin:password123@ds123151.mlab.com:23151/book-exchange", { useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
// Authentication
var auth = require('./routes/auth');
app.use('/api/auth', auth);

var book = require('./routes/book');

var image_upload = require('./routes/image-upload');
app.use('/api/image-upload', image_upload);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  if(err.status === 404){
    err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render({ error: err });
});

module.exports = app;
