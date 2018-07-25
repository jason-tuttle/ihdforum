const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress, ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
// const session = require('express-session');
const expressValidator = require('express-validator');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const typeDefs = require('../graphql/typedefs');
const resolvers = require('../graphql/resolvers');
const UserAPI = require('../graphql/user-datasource');
const path = require('path');
const ihdRouter = require('../routes/ihdRouter');
const loginRoute = require('../routes/handlers/login');

const app = express();

const getAccessToken = async function() {
  const now = Date.now();
  const credentials = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: 'https://jason-tuttle.auth0.com/api/v2',
  };

  // if access_token hasn't been set, or is expired...
  if (!access_token || access_token.issued < now + 86400000) {
    try {
      const data = await fetch('https://jason-tuttle.auth0.com/oauth/token',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(credentials),
        }
      )
        .then(response => response.json())
        .then(json => json);
        access_token = Object.assign({}, data, { issued: Date.now() });
    } catch(error) {
      throw new Error(error);
    }
  }
  return access_token;
};

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
  dataSources: () => {
    return {
        userAPI: new UserAPI(),
      };
  },
  context: async (data) => {
    const token = await getAccessToken();
    if (!data.req.headers.authorization) {
      throw new Error('you must be logged in.');
    }
    return Object.assign({}, data, { token });
  },
});

server.applyMiddleware({ app });

app.listen(process.env.PORT || 3100, function() {
  console.log("Cannonball runnin' at 3100");
});
