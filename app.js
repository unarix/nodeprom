var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta view como la default para las vistas
app.set('view engine', 'pug'); // configura a pug como el view engine.

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.use(logger('dev')); // motor de logs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Todos los archivos estaticos van a estar en la carpeta public

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Cualquiera sea el router cargo el usuario logueado y lo dejo disponible
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var editRouter = require('./routes/edit');
var newRouter = require('./routes/new');
var deleteRouter = require('./routes/delete');
var loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/edit', editRouter);
app.use('/new', newRouter);
app.use('/delete', deleteRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
