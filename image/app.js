// 모듈 로드하는 곳
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');

//라우터 연결시켜주는 곳
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const uploadTestRouter = require('./routes/uploadtest');  //multer로 이미지 업로드 프로토타입 라우터
const uploadRouter = require('./routes/upload');          //업로드 라우터

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// express 환경설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 주소를 통해서 라우터와 미들웨어를 연결시켜주는 곳(라우터 호출 주소)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/uploadtest', uploadTestRouter);
app.use('/upload', uploadRouter);

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
