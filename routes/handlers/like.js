'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const models = require('../../models');

router.post('/like/:id', function(req, res) {
  models.likes
    .findOrCreate({
      where: {
        userId: req.session.user.id,
        messageId: req.params.id,
      },
    })
    .then((like, created) => {
      if (created) {
        res.status(201).json(('success': 'added like'), ('like': like));
      } else {
        res.status(200).jason(('success': 'already liked'));
      }
    });
});

module.exports = router;