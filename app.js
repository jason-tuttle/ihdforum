const express = require('express');
const bbsRouter = require('./routes/bbsRouter');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
var Sequelize = require('sequelize');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use(session({
  secret: 'ford prefect',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (!req.session.active) {
    req.session.active = true;
    req.session.loggedIn = false;
    req.session.user = {};
    // console.log(req.session);
  }
  next();
});

app.use('/', bbsRouter);

app.get('/logout', function(req, res) {
  req.session.loggedIn = false;
  res.redirect('/');
})


app.listen(3000, function() { console.log("Cannonball runnin' at 3000"); });
