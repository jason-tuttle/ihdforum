const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const models = require('../../models');

router.post('/comment/:id', function(req, res) {
  const { id } = req.session.user;
  const messageId = req.params.id;
  req.checkBody('commentBody', 'not gonna post an empty message, yo!').notEmpty();
  req.checkBody('commentBody', 'BLAH BLAH BLAH too long!').isLength({ min: 1, max: 140 });
  req.getValidationResult().then(result => {
    if (result.isEmpty()) {
      // true means no errors!
      models.comments
        .create({
          messageId,
          comment: req.body.commentBody,
          userId: id,
        })
        .then(comment => res.status(200).json({ status: 'success', message: comment }));
    } else {
      res.status(500).json({ status: 'error', message: result.array()[0] });
    }
  });
});

module.exports = router;
