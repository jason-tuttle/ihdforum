const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');

router.get('/', function(req, res) {
  if (req.session.loggedIn) {
    models.Message
      .findAll({
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Like,
            as: 'likes',
            include: [
              {
                model: models.User,
                as: 'user',
                attributes: { exclude: ['password'] },
              },
            ],
          },
          {
            model: models.Comment,
            as: 'comments',
          },
        ],
        order: Sequelize.col('id'),
      })
      .then(function(msgs) {
        let allMessages = msgs.map(function(obj, i) {
          const time = moment(obj.createdAt).fromNow();
          const thisMsg = {
            id: obj.id,
            message: obj.message,
            createdAt: time,
            user: obj.user,
            likes: obj.likes,
            comments: obj.comments,
            isAuthor: obj.user.id === req.session.user.id,
            isLiked: obj.likes.some(thing => thing.userId === req.session.user.id),
          };
          return thisMsg;
        });
        res.render('index', { messages: allMessages, user: req.session.user, loggedIn: req.session.loggedIn });
      });
  } else {
    res.redirect('/login');
  }
});

router.post('/like/:id', function(req, res) {
  models.Like
    .findOrCreate({
      where: {
        userId: req.session.user.id,
        messageId: req.params.id,
      },
    })
    .then(function(record) {
      res.redirect('/');
    });
});

module.exports = router;
