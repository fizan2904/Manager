const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://127.0.0.1/timetable');
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.text({ type : 'text/html' }));
app.use(cookieParser());
app.use(session({
	secret : 'fuwit7wryhwi4r74tgh',
	saveUninitialized : false,
	resave : true
}));
app.use(passport.initialize());
app.use(passport.session());

var base = require('./routes/base');

app.use('/', base);

app.listen(process.env.PORT | 3000);