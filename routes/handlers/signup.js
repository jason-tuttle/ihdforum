'use strict';
const express = require('express');
const models = require('../../models');

const signupApp = express();
const router = express.Router();

router.get('/signup', function(req, res) {
  res.render('signup', {});
});

// handle form submission
router.post('/signup', function(req, res) {
  console.log(req.body);
  const { displayname, username, password } = req.body; // store the values passed in
  req.checkBody('displayname', 'please enter a displayname').notEmpty();
  req.checkBody('username', 'please enter a username').notEmpty();
  req.checkBody('password', 'please enter a password').notEmpty();
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) { // .isEmpty:true means no validation errors...
      models.users.findOne({ where: {username: username}}) // check users table
        .then(function(user) {
          if (user) {  // if findOne() returned something not NULL, username already exists
            res.render('signup', {error: [{msg: 'that username already exists! please choose a new one.'}]});
          } else {
            models.users.create({
              displayname: displayname,
              username: username,
              password: password
            }).then(function(user) {
              console.log(user);
              req.session.loggedIn = true;
              req.session.user = displayname;
              res.redirect('/');
            });
          }
        });
    } else {
      console.log(result.array());
      res.render('signup', {error: result.array()[0]});
    }
  });
});

module.exports = router;
