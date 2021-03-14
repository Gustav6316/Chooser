const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
//const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const cardsRouter = require('./routes/cards');
const winnerRouter = require('./routes/winner');
const winnersRouter = require('./routes/winners');

const app = express();

//Cors package funktioniert nicht, muss mich noch einlesen
//app.use(cors);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/winner', winnerRouter);
app.use('/api/winners', winnersRouter);

module.exports = app;
