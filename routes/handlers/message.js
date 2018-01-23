const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');

router.get('/message/:id', function(req, res) {
  if (req.session.loggedIn) {
    models.messages
      .find({
        where: { id: req.params.id },
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
          user: msg.user.displayname,
          createdAt: moment(msg.createdAt).fromNow(),
        };
        res.render('message', { 
          message: theMessage,
          likes: msg.likes,
          comments: msg.comments,
          loggedIn: req.session.loggedIn });
      });
  } else {
    res.redirect('/login');
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
      models.comment
        .create({
          messageId,
          comment: req.body.commentBody,
          userId: id,
        })
        .then(() => res.redirect('/'));
    } else {
      res.render('compose', { error: result.array()[0] });
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
      res.redirect('/');
    });
});

module.exports = router;
