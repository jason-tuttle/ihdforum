const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress, registerServer } = require('apollo-server-express');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server');
// const { RESTDataSource } = require('apollo-datasource-rest');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const UserAPI = require('./graphql/user-datasource');
const path = require('path');
const ihdRouter = require('./routes/ihdRouter');
const loginRoute = require('./routes/handlers/login');
// const session = require('express-session');
const expressValidator = require('express-validator');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const tokens = require('./data/tokens');

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

// class UserAPI extends RESTDataSource {
//   constructor() {
//     super();
//     this.baseURL = 'https://jason-tuttle.auth0.com/api/v2/';
//   }
//
//   // willSendRequest(request) {
//   //   request.headers.set('Authorization', this.context.token);
//   // }
//
//   async getUser(id) {
//     console.log('getting User...');
//     return await this.get(`users/${id}`);
//   }
//
//   async getUsers() {
//     return await this.get('users/');
//   }
// }

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (data) => {
    if (!data.req.headers.authorization) {
      throw new Error('you must be logged in.');
    }
    return {
      ...data,
      dataSources: {
          userAPI: new UserAPI(),
        }
    };
  },
});

registerServer({ server, app });

app.listen(process.env.PORT || 3100, function() {
  console.log("Cannonball runnin' at 3100");
});
