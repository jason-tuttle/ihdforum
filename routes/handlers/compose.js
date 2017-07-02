const express = require('express');
const router = express.Router();

router.get('/compose', function(req, res) {
  res.render('compose', {});
});
router.post('/compose', function(req, res) {
  res.send('compose post')
})

module.exports = router;
