const express = require('express');
const router = express.Router();

const models = require('../../models');
// const expressSession = require('express-session');
router.get('/', function(req, res) {
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
      ]
    }).then(function(msgs) {
      res.render('index', { messages: msgs });
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
