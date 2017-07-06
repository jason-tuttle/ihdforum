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
  models.likes.find({
    where: {messageId: req.params.id},
    include: [
      {
        model: models.messages,
        as: 'message',
      }
    ]
  }).then(function(likes) {
    console.log(likes.toJSON());
    likes.destroy();
    likes.message.destroy();
    res.redirect('/');
  });
});

// router.post('/', function(req, res) {
//   res.send('root post')
// });


module.exports = router;
