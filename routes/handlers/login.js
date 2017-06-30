const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  res.send('login get');
});
router.post('/login', function(req, res) {
  res.send('login post')
})

module.exports = router;
