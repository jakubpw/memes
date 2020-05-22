var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose()

var indexRouter = require('./routes/index');
var memeRouter = require('./routes/meme');

var app = express();

// przygotowanie bazy danych
var db = new sqlite3.Database(':memory:')
db.serialize(function () {
  db.run("CREATE TABLE memes (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (255) NOT NULL, url VARCHAR (255) NOt NULL)");
  db.run("CREATE TABLE prices (id INTEGER PRIMARY KEY AUTOINCREMENT, idmem INTEGER REFRENCES memes, price INTEGER, date DATETIME)");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem1', 'https://i.redd.it/h7rplf9jt8y21.png')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem2', 'https://i.redd.it/jrcrar7ji2z41.jpg')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem3', 'https://i.redd.it/lvdrhlv25b051.jpg')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem4', 'https://i.redd.it/9qua1stcqxy41.png')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem5', 'https://i.imgflip.com/30zz5g.jpg')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem6', 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem7','https://preview.redd.it/6zxe5qfu29051.jpg?width=640&crop=smart&auto=webp&s=4064a25a3c87f0548d5ea78817285716b318a31f')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem8', 'https://preview.redd.it/jt5yupebk9051.png?width=640&crop=smart&auto=webp&s=c14ed84b710f3cb7e8f45602e07ecaf1be05819b')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem9', 'https://preview.redd.it/03uxeowkc7051.jpg?width=640&crop=smart&auto=webp&s=9bb66348d8f551f0a1ee7ca84270c7e0402766f7')");
  db.run("INSERT INTO memes (name, url) VALUES ('Mem10', 'https://i.redd.it/7ngvsd31u0z41.jpg')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('1', '100', '2020-05-22 15:41:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('2', '120', '2020-05-22 16:41:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('3', '130', '2020-05-22 17:41:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('4', '140', '2020-05-22 18:41:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('5', '150', '2020-05-22 19:41:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('6', '160', '2020-05-22 15:31:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('7', '170', '2020-05-22 15:42:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('8', '180', '2020-05-22 15:51:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('9', '190', '2020-05-22 15:43:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('10', '199', '2020-05-22 15:44:22')");
  db.run("INSERT INTO prices (idmem, price, date) VALUES ('10', '201', '2020-05-22 15:51:23')");
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  req.db = db;
  next();
})
app.use('/', indexRouter);
app.use('/meme', memeRouter);

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