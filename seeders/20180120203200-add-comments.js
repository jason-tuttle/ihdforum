'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        comment: 'I am commenting on this message.',
        messageId: 1,
        userId: 1,
      },
      {
        comment: 'My comment is valuable in this case.',
        messageId: 2,
        userId: 1,
      },
      {
        comment: 'The very fact that we are here and alive today is a good sign.',
        messageId: 2,
        userId: 3,
      },
      {
        comment: 'You totally stole that from Alex DeMots.',
        messageId: 3,
        userId: 2,
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
