'use strict';
const express = require('express');
const models = require('../models');
const loginApp = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = express.Router();


loginApp.use(bodyParser.urlencoded({extended: true}));
// use validator to check form submissions
loginApp.use(expressValidator());

router.get('/login', function(req, res) {
  res.render('login', {});
});
router.post('/login', function(req, res) {
  const {formUsername, formPassword} = req.body; // store the values passed in
  req.checkBody('username', 'please enter a username').notEmpty();
  req.checkBody('password', 'please enter a password').notEmpty();
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) { // .isEmpty:true means no validation errors...
      models.users.findOne({ where: {username: formUsername}}) // check users table
        .then(function(user) {
          if (user) {  // if findOne() returned something not NULL
            if (formPassword === user.password) { // check if the passwords match
              req.session.loggedIn = true;  // set session variable to true if so
              res.redirect('/');  // and redirect to '/'
            } else {
              res.render('login', {error: 'username and password don\'t match'});
            }
          } else {
            res.render('login', {error: 'username not found. click signup to create one!'});
          }
        });
    } else {
      res.render('login', {error: result.useFirstErrorOnly().array()});
    }
  });
});

module.exports = router;
