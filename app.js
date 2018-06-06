const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress, registerServer } = require('apollo-server-express');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const path = require('path');
const ihdRouter = require('./routes/ihdRouter');
const loginRoute = require('./routes/handlers/login');
const session = require('express-session');
const expressValidator = require('express-validator');
const cors = require('cors');

const app = express();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

// The root provides a resolver function for each API endpoint

// var schema = makeExecutableSchema({typeDefs, resolvers});
// addMockFunctionsToSchema({ schema, mocks });

// app.use('/graphql',
//   bodyParser.json(),
//   graphqlExpress({ schema })
// );
//
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use('*', cors({ origin: 'http://localhost:3000'}))
app.use('/resources', express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'ford prefect',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
  })
);

app.use(function(req, res, next) {
  console.log('SESSION ACTIVE? : ', req.session.active);

  if (!req.session.active) {
    console.log('resetting session')
    req.session.active = true;
    req.session.users = [];
  }
  next();
});

// app.use('/', ihdRouter);
app.use('/', loginRoute);

app.get('/logout', function(req, res) {
  req.session.loggedIn = false;
  res.status(200).json({status:'success', message:'logged out'});
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: function({req}) {
  //   console.log('APOLLO REQUEST COOKIE:', req.session.cookie);
  //   if (req.session.cookie.user) {
  //     return req.session.cookie.user;
  //   } else {
  //     throw new Error('you must be logged in');
  //   }
  // }
});

registerServer({ server, app });

app.listen(process.env.PORT || 3100, function() {
  console.log("Cannonball runnin' at 3100");
});
