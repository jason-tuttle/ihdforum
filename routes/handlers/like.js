'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const likeRouter = express.Router();

const models = require('../../models');

likeRouter.post('/like/:id', function(req, res) {
  models.likes
    .findOrCreate({
      where: {
        userId: req.session.user.id,
        messageId: req.params.id,
      },
    })
    .then((like, created) => {
      if (created) {
        res.status(201).json({ success: 'added like', like: like });
      } else {
        res.status(200).json({ success: 'already liked' });
      }
    })
    .catch(error => res.status(500).json({ status: 'error', message: error }));
});

module.exports = likeRouter;
