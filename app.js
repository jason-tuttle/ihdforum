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
// const session = require('express-session');
const expressValidator = require('express-validator');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

if (process.env.PWD !== '/Users/jasontuttle/Developer/ihdforum') {
  const { Client } = require('pg');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use('*', cors({ origin: 'http://localhost:3000'}))
app.use('/resources', express.static(path.join(__dirname, 'public')));

app.use('/', loginRoute);

app.get('/logout', function(req, res) {
  req.session.loggedIn = false;
  res.status(200).json({status:'success', message:'logged out'});
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function({req}) {
    if (req.headers.authorization) {
      const parts = req.headers.authorization.split('');
      const token = parts[1];
      const user = jwt.decode(token);
    } else {
      throw new Error('you must be logged in.');
    }
  }
});

registerServer({ server, app });

app.listen(process.env.PORT || 3100, function() {
  console.log("Cannonball runnin' at 3100");
});
