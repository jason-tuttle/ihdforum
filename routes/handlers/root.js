const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const router = express.Router();

const models = require('../../models');

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
          as: 'likes',
          include: [{
            model: models.users,
            as: 'user',
            attributes: {exclude: ['password']}
          }]
        }
      ],
      order: Sequelize.col('createdAt')
    }).then(function(msgs) {
      let allMessages = msgs.map(function(obj, i) {
        const time = moment(obj.createdAt).fromNow();
        // console.log(obj.toJSON());
        const thisMsg = {
          id: obj.id,
          message: obj.message,
          createdAt:time,
          user: obj.user,
          likes: obj.likes,
          isAuthor: (obj.user.id === req.session.user.id),
          isLiked: (obj.likes.some(thing => thing.userId === req.session.user.id))
        };
        // console.log(thisMsg);
        return thisMsg;
      });
      // console.log(allMessages);
      res.render('index', { messages: allMessages, user: req.session.user, loggedIn: req.session.loggedIn });
    });
  } else {
    res.redirect('/login');
  }
});

// router.post('/delete/:id', function(req, res) {
//   models.messages.find({
//     where: {id: req.params.id},
//     include: [
//       {
//         model: models.users,
//         as: 'user',
//         attributes: {exclude: ['password']}
//       },
//       {
//         model: models.likes,
//         as: 'likes',
//         include: [{
//           model: models.users,
//           as: 'user',
//           attributes: {exclude: ['password']}
//         }]
//       }
//     ]
//   }).then(function(record) {
//     record.destroy();
//     res.redirect('/');
//   });
// });

router.post('/like/:id', function(req, res) {
  models.likes.findOrCreate({where: {
    userId: req.session.user.id,
    messageId: req.params.id
  }}).then(function(record) {
    res.redirect('/');
  });
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
