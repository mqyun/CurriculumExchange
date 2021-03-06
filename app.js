var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');

var studentuser = require('./routes/student/users');

var teacheruser = require('./routes/teacher/users');
var teachermanage = require('./routes/teacher/manage');

var forumindex = require('./routes/forum/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'secret'
}));
app.use(function(req, res, next) {
	// 用户属性
	res.locals.usertype = req.session.usertype || '';
	// 用户真实名字
	res.locals.name = req.session.name || '';
	// 用户的id
	res.locals.uid = req.session.uid || '';
	next();
});

app.use(function(req, res, next) {
	if (req.session.uid == '' || req.session.uid == null) {
		if (req.url == '/teacher/' || req.url == '/student/' || req.url == '/teacher' || req.url == '/student' || req.url.indexOf('/forum') != -1) {
			res.redirect('/');
		} else {
			next();
		}
	} else {
		if (req.url == '/' || req.url == '/reg') {
			if (req.session.usertype == 0) {
				res.redirect('/student');
			} else {
				res.redirect('/teacher');
			}
		} else {
			next();
		}
	}
});

app.use('/', index);

app.use('/student', studentuser);

app.use('/teacher', teacheruser);
app.use('/teachermanage', teachermanage);

app.use('/forum', forumindex);

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
	res.render('public/error');
});

module.exports = app;
