const express = require('express');
const router = express.Router();

router.get('/signup', function(req, res) {
  res.send('signup get');
});
router.post('/signup', function(req, res) {
  res.send('signup post')
})

module.exports = router;
