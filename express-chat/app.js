var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var config = require('./config');
var HttpError = require('./error').HttpError;
var mongoose = require('./libs/mongoose');
var session = require('express-session')
var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals')); // layout partial block
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/sendHttpError'));

// var MongoStore = require('connect-mongo')(session);
// app.use(session({
  // secret: config.get('session:secret'),
  // key: config.get('session:key'),
  // cookie: config.get('session:cookie'),
  // store: new MongoStore({
    // mongoose_connection: mongoose.connection
  // })
// })); // connect.sid

app.use(function(req, res, next) {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.send("Visits: " + req.session.numberOfVisits);
})

app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (typeof err == 'number') {
    err = new HttpError(404, 'not found')
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
