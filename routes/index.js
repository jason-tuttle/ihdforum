const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', function(req, res) {
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
})

module.exports = router;
