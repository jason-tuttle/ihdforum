const models = require('../models');

const resolvers = {
  Query: {
    user(root, args, context, info) {
      return models.users.find({ where: args });
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
  Message: {
    user(message) {
      return message.getUser();
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
      return comment.getUser();
    }
  },
};

module.exports = resolvers;
