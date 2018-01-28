const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');

router.get('/message/:id', function(req, res) {
  if (req.session.loggedIn) {
    models.messages
      .findOne({
        where: { id: req.params.id },
        attributes: { include: ['id'] },
        include: [
          {
            model: models.users,
            as: 'user',
            attributes: { exclude: ['password'] },
          },
          {
            model: models.likes,
            as: 'likes',
            include: [
              {
                model: models.users,
                as: 'user',
                attributes: { exclude: ['password'] },
              },
            ],
          },
          {
            model: models.comments,
            as: 'comments',
            include: [
              {
                model: models.users,
                as: 'user',
                attributes: { exclude: ['password'] },
              },
            ],
          },
        ],
      })
      .then(function(msg) {
        const theMessage = {
          message: msg.message,
          messageId: msg.id,
          user: msg.user.displayname,
          createdAt: moment(msg.createdAt).fromNow(),
        };
        res.status(200).json({
          status: 'success',
          message: {
            user: req.session.user,
            message: theMessage,
            likes: msg.likes,
            comments: msg.comments,
            loggedIn: req.session.loggedIn,
          },
        });
      });
  } else {
    res.status(400).json({ status: 'error', message: 'not logged in' });
  }
});

router.post('/message/:id/comment', function(req, res) {
  const { name, id } = req.session.user;
  const messageId = req.params.id;
  req.checkBody('commentBody', 'not gonna post an empty message, yo!').notEmpty();
  req.checkBody('commentBody', 'BLAH BLAH BLAH too long!').isLength({ min: 1, max: 140 });
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) {
      // true means no errors!
      models.comments
        .create({
          messageId,
          comment: req.body.commentBody,
          userId: id,
        })
        .then(message => res.status(200).json({ status: 'success', message: message }));
    } else {
      res.status(500).json({ status: 'error', message: result.array()[0] });
    }
  });
});

router.delete('/message/:id/delete', function(req, res) {
  models.messages
    .find({
      where: { id: req.params.id },
      include: [
        {
          model: models.likes,
          as: 'likes',
        },
      ],
    })
    .then(function(message) {
      message.destroy();
      res.status(200).json({ status: 'success', message: 'disliked' });
    });
});

module.exports = router;
