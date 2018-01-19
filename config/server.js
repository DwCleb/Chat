var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var urlSlug = require('slugg');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.set('slugify', urlSlug);

app.use(express.static(__dirname + "/../app/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;
