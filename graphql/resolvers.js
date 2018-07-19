const models = require('../models');
const Users = require('../models/Users');

const resolvers = {
  Query: {
    user(root, args, context, info) {
      // return models.users.find({ where: args, attributes: { exclude: ['password'] }, });
      return Users.getUser(args);
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
  Like: {
    user(like) {
      return like.getUser();
    }
  }
};

module.exports = resolvers;
