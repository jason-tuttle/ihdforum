const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');

router.get('/message/:id', function(req, res) {
  if (req.session.loggedIn) {
    models.messages.find({
      where: {id: req.params.id},
      include: [
        {
          model: models.users,
          as: 'user',
          attributes: {exclude: ['password']}
        },
        {
          model: models.likes,
          as: 'likes',
          include: [{
            model: models.users,
            as: 'user',
            attributes: {exclude: ['password']}
          }]
        }
      ]
    }).then(function(msg) {
      const theMessage = {
        message: msg.message,
        user: msg.user.displayname,
        createdAt: moment(msg.createdAt).fromNow(),
      };
      res.render('message', { message: theMessage, likes: msg.likes, loggedIn: req.session.loggedIn });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/message/:id/delete', function(req, res) {
  models.messages.find({
    where: {id: req.params.id},
    include: [
      {
        model: models.likes,
        as: 'likes',
      }
    ]
  }).then(function(message) {
    message.destroy();
    res.redirect('/');
  });
});

module.exports = router;
