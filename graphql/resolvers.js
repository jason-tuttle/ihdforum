const models = require('../models');
const UserAPI = require('./user-datasource');
const fetch = require('node-fetch');
const tokens = require('../data/tokens');
const baseUrl = 'https://jason-tuttle.auth0.com/api/v2/';

const getUsers = function() {
  const url = baseUrl + 'users';
  const headers = { authorization: `Bearer ${tokens.acces_token}` };
  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then(res => res.json());
}

const getUser = function(id) {
  const url = `${baseUrl}users/${id}`;
  const headers = { authorization: `Bearer ${tokens.acces_token}` };
  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then(res => res.json());
}


const resolvers = {
  Query: {
    user: async (root, { id }, { dataSources }) => {
      return await dataSources.userAPI.getUser(id);
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
        userId: messageInput.userId
      }).then(message => message);
    },
    addComment(root, { commentInput }) {
      return models.comments.create({
        comment: commentInput.comment,
        userId: commentInput.userId,
        messageId: commentInput.messageId
      }).then(comment => comment);
    }
  },
  Message: {
    user(message) {
      console.log('*** MESSAGE:', message);
      // return message.getUser();
      return getUser(message.userId);
    },
    likes(message) {
      return message.getLikes();
    },
    comments(message) {
      return message.getComments();
    }
  },
  Comment: {
    user(comment) {
      // return comment.getUser();
      return getUser(message.userId);
    }
  },
  Like: {
    user(like) {
      // return like.getUser();
      return getUser(message.userId);
    }
  }
};

module.exports = resolvers;
