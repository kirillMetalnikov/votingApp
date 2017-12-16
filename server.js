'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var fallback = require('express-history-api-fallback');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/client', express.static(process.cwd() + '/client'));
app.use('/public', express.static(process.cwd() + '/client/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));


app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true,
	maxAge: 60000,
	expires: 60000
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

// 'falback' need for react-router withoout #
app.use(fallback(process.cwd() + '/client/public/index.html'));

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
