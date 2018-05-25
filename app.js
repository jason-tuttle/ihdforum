const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const path = require('path');
const ihdRouter = require('./routes/ihdRouter');
const session = require('express-session');
const expressValidator = require('express-validator');

var Sequelize = require('sequelize');

const app = express();

var typeDefs = [`
  type Query {
    hello: String
    goodbye: String
  }

  schema {
    query: Query
  }
`];

// The root provides a resolver function for each API endpoint
var resolvers = {
  Query: {
    hello(root) {
      return 'world';
    },
    goodbye(root) {
      return 'cruel world!'
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

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
