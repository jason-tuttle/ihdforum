const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');
// const expressSession = require('express-session');
router.get('/', function(req, res) {
  // console.log(req.session);
  if (req.session.loggedIn) {
    models.messages.findAll({
      include: [
        {
          model: models.users,
          as: 'user'
        },
        {
          model: models.likes,
          as: 'likes'
        }
      ],
      order: Sequelize.col('createdAt','DESC')
    }).then(function(msgs) {
      let allMessages = msgs.map(function(obj, i) {
        const time = moment(obj.createdAt).fromNow();
        return {
          message: obj.message,
          createdAt:time,
          user: obj.user,
          likes: obj.likes
        };
      });
      res.render('index', { messages: allMessages, user: req.session.user, loggedIn: req.session.loggedIn });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res) {
  res.send('root post')
});


module.exports = router;

// {
//   get: function(req, res) {
//     models.messages.findAll({
//       include: [
//         {
//           model: models.users,
//           as: 'user'
//         },
//         {
//           model: models.likes,
//           as: 'likes'
//         }
//       ]
//     }).then(function(msgs) {
//       res.render('index', { messages: msgs });
//     });
//   },
//   post: function(req, res) {
//     models.messages.findAll({
//       include: [
//         {
//           model: models.users,
//           as: 'user'
//         },
//         {
//           model: models.likes,
//           as: 'likes'
//         }
//       ]
//     }).then(function(msgs) {
//       res.render('index', { messages: msgs });
//     });
//   }
// }
