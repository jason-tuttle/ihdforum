'use strict';
const express = require('express');
const models = require('../../models');
const router = express.Router();

router.get('/compose', function(req, res) {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('compose', {user: req.session.user, loggedIn: req.session.loggedIn});
  }
});

router.post('/compose', function(req, res) {
  const { name, id } = req.session.user;
  req.checkBody('messageBody', 'not gonna post an empty message, yo!').notEmpty();
  req.checkBody('messageBody', 'BLAH BLAH BLAH too long!').isLength({min: 1, max: 140});
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) { // true means no errors!
      models.messages.create({
        message: req.body.messageBody,
        userId: req.session.user.id
      }).then(message => res.redirect('/'));
    } else {
      res.render('compose', {error: result.array()[0]});
    }
  });
})

module.exports = router;
