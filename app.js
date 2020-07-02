//const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require("mongoose")
const workersRouter = require('./routes/workers');
const companyRouter = require('./routes/company');

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/company",//mongoose connect
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.static("public"))
app.use('/worker', workersRouter);
app.use('/company', companyRouter);



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

app.listen("8080", function () {
  console.log("port 8080");

})
