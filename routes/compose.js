const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('compose');
});

module.exports = router;
