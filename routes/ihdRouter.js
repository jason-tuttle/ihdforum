const express = require('express');
const { root, login, signup, compose, message, comment, like } = require('./handlers');

const router = express.Router();

router.use('/', root);
router.use('/', compose);
router.use('/', login);
router.use('/', signup);
router.use('/', message);
router.use('/', comment);
router.use('/', like);

module.exports = router;
