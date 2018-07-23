'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        comment: 'I am commenting on this message.',
        messageId: 1,
        user: 'auth0|5b154f2b157859716f2c1232',
      },
      {
        comment: 'My comment is valuable in this case.',
        messageId: 2,
        user: 'auth0|5b154f2b157859716f2c1232',
      },
      {
        comment: 'The very fact that we are here and alive today is a good sign.',
        messageId: 2,
        user: 'google-oauth2|112109242494166402587',
      },
      {
        comment: 'You totally stole that from Alex DeMots.',
        messageId: 3,
        user: 'twitter|62883362',
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
