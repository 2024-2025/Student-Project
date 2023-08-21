var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const ClassRouter = require('./router/ClassRouter')
const UserRouter = require('./router/UserRouter')
const LoginRouter = require('./router/Login')
const Invoice = require('./router/Invoice')
const StudentRouter = require('./router/StudentRouter')
const ReceiptRouter = require('./router/ReceiptRouter')
const EmailSend = require('./router/SendEmail')

var app = express();

app.use(express.json())




const cors=require('cors')


app.use(cors())
app.use('/login', LoginRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/images')));
mongoose.connect('mongodb://127.0.0.1:27017/StudentProjects')
  .then(() => console.log('Connected Mongodb Database'))
const jwt = require('jsonwebtoken')


// middleware 

// app.use((req, res, next) => {
//   try {


//     const token = req.headers['token']

//     if (!token) return res.send('no token');

//     const decode = jwt.decode(token, 'lii')

//     if (!decode) return res.send('xogtaada waa qalad');

//     const endecode = jwt.verify(token, 'lii');

//     next()

//     return endecode
//   } catch (error) {

//     res.send(error.message)

//   }




// })

app.use('/student', StudentRouter);
app.use('/class', ClassRouter);
app.use('/email', EmailSend);
app.use('/user', UserRouter);
app.use('/invoice', Invoice);
app.use('/receipt', ReceiptRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
