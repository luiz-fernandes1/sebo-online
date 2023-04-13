var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/book');
var app = express();

const cors = require('cors');

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:CI7tIvxnkRK6diHP@development.axdehc0.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection OK")
}).catch((err) => {
    console.log(err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const verifyAccessToken = require('./routes/middleware/verifyAccessTokenMiddleware');
const { application } = require('express');

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/', verifyAccessToken, indexRouter);

module.exports = app;
