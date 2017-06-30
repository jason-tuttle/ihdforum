const express = require('express');
const loginApp = express();
const bodyParser = require('body-parser');
const router = express.Router();

loginApp.use(bodyParser.urlencoded({extended: true}));

router.get('/login', function(req, res) {
  res.render('login', {});
});
router.post('/login', function(req, res) {
  const {username, password} = req.body;
  // need to query the db for the username and password, and it it's not there
  // send them to the signup page
  res.send('login post: ' + response);
})

module.exports = router;
