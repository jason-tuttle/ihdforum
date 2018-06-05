'use strict';
const express = require('express');
const Sequelize = require('sequelize');
const models = require('../../models');

const loginApp = express();
const router = express.Router();

const Op = Sequelize.Op;

router.get('/login', function(req, res) {
  res.render('login', { loggedIn: req.session.loggedIn });
});

// handle form submission
router.post('/login', function(req, res) {
  const { username, password } = req.body; // store the values passed in
  req.checkBody('username', 'please enter a username').notEmpty();
  req.checkBody('password', 'please enter a password').notEmpty();
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) {
      // .isEmpty:true means no validation errors...
      models.users
        .findOne({ where: { username: {[Op.eq]: username} } }) // check users table
        .then(function(user) {
          if (user) {
            // if findOne() returned something not NULL
            if (password === user.password) {
              // check if the passwords match
              req.session.loggedIn = true; // set session variable to true if so
              req.session.active = true;
              req.session.cookie.user = { name: username, displayname: user.displayname, id: user.id };
              console.log('setting session: ', req.sessionID);
              res.status(200).json({
                status: 'success',
                message: `user ${username} logged in`,
                data: req.sessionId,
              });
            } else {
              res.status(401).json({ status: 'error', message: "username and password don't match" });
            }
          } else {
            res.status(404).json({ status: 'error', message: 'username not found' });
          }
        });
    } else {
      res.status(400).json({ status: 'error', message: result.array() });
    }
  });
});

module.exports = router;
