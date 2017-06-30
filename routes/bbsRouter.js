const express = require('express');
const { root, login, signup, compose } = require('./handlers');

const router = express.Router();

router.use('/', root);
router.use('/', compose);
router.use('/', login);
router.use('/', signup);

module.exports = router;
