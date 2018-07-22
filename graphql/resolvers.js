const models = require('../models');
const UserAPI = require('./user-datasource');
const fetch = require('node-fetch');
const tokens = require('../data/tokens');
const baseUrl = 'https://jason-tuttle.auth0.com/api/v2/';

// const getUsers = async function() {
//   const url = baseUrl + 'users';
//   const headers = { authorization: `Bearer ${tokens.acces_token}` };
//   return await fetch(url, {
//     method: 'GET',
//     headers,
//   })
//     .then(res => res.json());
// }

// const getUser = function(id) {
//   const url = `${baseUrl}users/${id}`;
//   const headers = { authorization: `Bearer ${tokens.acces_token}` };
//   return fetch(url, {
//     method: 'GET',
//     headers,
//   })
//     .then(res => res.json());
// }


const resolvers = {
  Query: {
    async user(root, { user_id }, context) {
      console.log('#####CONTEXT:', context);
      return await context.dataSources.userAPI.getUser(user_id);
    },
    async users(root, _, { dataSources }) {
      return await dataSources.userAPI.getUsers();
    },
    message(root, args, context, info) {
      return models.messages.find({ where: args });
    },
    messages(root, args, context, info) {
      return models.messages.findAll({ where: args });
    },
    comment(root, args, context, info) {
      return models.comments.find();
    },
    comments(root, args, context, info) {
      return models.comments.findAll({ where: args });
    },
    likes(root, args, context, info) {
      return models.likes.findAll({ where: args });
    },
  },
  Mutation: {
    addMessage(root, { messageInput }) {
      return models.messages.create({
        message: messageInput.message,
        user: messageInput.user
      }).then(message => message);
    },
    addComment(root, { commentInput }) {
      return models.comments.create({
        comment: commentInput.comment,
        user: commentInput.user,
        messageId: commentInput.messageId
      }).then(comment => comment);
    }
  },
  Message: {
    user(message, args, { dataSources }) {
      console.log('***** MESSAGE', message);
      console.log('***** ARGS', args);
      return dataSources.getUser(message.user);
      // return getUser(message.user);
    },
    likes(message) {
      return message.getLikes();
    },
    comments(message) {
      return message.getComments();
    }
  },
  User: {
    messages(user) {
      return user.getMessages();
    },
    comments(user) {
      return user.getComments();
    },
    likes(user) {
      return user.getLikes();
    }
  },
  Comment: {
    user(comment) {
      // return comment.getUser();
      return comment.getUser(comment.user);
    }
  },
  Like: {
    user(like) {
      // return like.getUser();
      return like.getUser(like.user);
    }
  }
};

module.exports = resolvers;
