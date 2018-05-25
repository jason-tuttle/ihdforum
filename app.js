const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const path = require('path');
const ihdRouter = require('./routes/ihdRouter');
const session = require('express-session');
const expressValidator = require('express-validator');
const cors = require('cors');

const app = express();


// The root provides a resolver function for each API endpoint

var schema = makeExecutableSchema({typeDefs, resolvers});
// addMockFunctionsToSchema({ schema, mocks });

app.use('/graphql',
  bodyParser.json(),
  graphqlExpress({ schema })
);

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use('*', cors({ origin: 'http://localhost:3000'}))
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
