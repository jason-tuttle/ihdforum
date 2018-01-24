'use strict';
const express = require('express');
const models = require('../../models');

const loginApp = express();
const router = express.Router();

router.get('/login', function(req, res) {
  res.render('login', { loggedIn: req.session.loggedIn });
});

// handle form submission
router.post('/login', function(req, res) {
  if (req.body.button === 'signup') {
    // if user hits the signup button
    res.redirect('signup'); // send them to the signup page
  } else {
    // otherwise...
    const { username, password } = req.body; // store the values passed in
    req.checkBody('username', 'please enter a username').notEmpty();
    req.checkBody('password', 'please enter a password').notEmpty();
    req.getValidationResult().then(function(result) {
      if (result.isEmpty()) {
        // .isEmpty:true means no validation errors...
        models.users
          .findOne({ where: { username: username } }) // check users table
          .then(function(user) {
            if (user) {
              // if findOne() returned something not NULL
              if (password === user.password) {
                // check if the passwords match
                req.session.loggedIn = true; // set session variable to true if so
                req.session.user = { name: username, displayname: user.displayname, id: user.id };
                res.status(200).json({ success: 'user logged in' });
              } else {
                res.status(401).json({ error: "username and password don't match" });
              }
            } else {
              res.status(403).json({ error: 'username not found' });
            }
          });
      } else {
        res.status(400).json({ error: result.array() });
      }
    });
  }
});

module.exports = router;
