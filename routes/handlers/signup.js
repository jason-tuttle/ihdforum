'use strict';
const express = require('express');
const models = require('../../models');

const signupApp = express();
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/signup', function(req, res) {
  res.render('signup', { user: req.session.user });
});

// handle form submission
router.post('/signup', function(req, res) {
  const { displayname, username, password } = req.body; // store the values passed in
  req.checkBody('displayname', 'please enter a displayname').notEmpty();
  req.checkBody('username', 'please enter a username').notEmpty();
  req.checkBody('password', 'please enter a password').notEmpty();
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) {
      // .isEmpty:true means no validation errors...
      models.User.findOne({ where: { username: { [Op.eq]: username } } }) // check users table
        .then(function(user) {
          if (user) {
            // if findOne() returned something not NULL, username already exists
            res.status(404).json({ status: 'error', message: 'username already exists' });
          } else {
            models.User.create({
              displayname: displayname,
              username: username,
              password: password,
            }).then(user => {
              req.session.loggedIn = true;
              req.session.user = { name: username, id: user.id };
              res.status(200).json({ status: 'success', message: `user ${username} logged in` });
            });
          }
        });
    } else {
      res.status(500).json({ status: 'error', message: result.array()[0] });
    }
  });
});

module.exports = router;
