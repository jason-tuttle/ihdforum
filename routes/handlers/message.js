const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');
// const expressSession = require('express-session');
router.get('/message/:id', function(req, res) {
  // console.log(req.session);
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
      console.log(theMessage);
      res.render('message', { message: theMessage, likes: msg.likes, loggedIn: req.session.loggedIn });
    });
  } else {
    res.redirect('/login');
  }
});

// router.post('/', function(req, res) {
//   res.send('root post')
// });


module.exports = router;
