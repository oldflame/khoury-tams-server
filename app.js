var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    jade = require('jade'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    helmet = require('helmet'),
    bodyParser = require('body-parser');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var enableCORS = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,Access-Control-Allow-Origin');
  next();
};
app.use(enableCORS);
global.appRoot = path.resolve(__dirname)
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
helmet(app);

//setup mongoose
app.db = mongoose.createConnection('mongodb+srv://dhavaldedhia:dhavaldedhia@cluster0-zrpal.mongodb.net/tams?retryWrites=true&w=majority',{useMongoClient: true});
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', () => {
  //and... we have a data store
  console.log('DB connection successful');
});

require('./models')(app, mongoose);


require('./routes')(app);

//setup utilities
// app.utility = {};
// app.utility.sendmail = require('./util/sendmail');
// app.utility.slugify = require('./util/slugify');
// app.utility.workflow = require('./util/workflow');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var server = app.listen(process.env.PORT || 7000, () => {console.log("Server running at port ",process.env.PORT || 7000)})
