const express = require('express');
const path = require('path');
const ihdRouter = require('./routes/ihdRouter');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const app = express();

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/resources', express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'ford prefect',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function(req, res, next) {
  if (!req.session.active) {
    req.session.active = true;
    req.session.loggedIn = false;
    req.session.user = {};
  }
  next();
});

app.use('/', ihdRouter);

app.get('/logout', function(req, res) {
  req.session.loggedIn = false;
  res.redirect('/');
});

app.listen(3100, function() {
  console.log("Cannonball runnin' at 3100");
});
