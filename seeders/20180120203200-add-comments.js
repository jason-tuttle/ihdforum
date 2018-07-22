'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        comment: 'I am commenting on this message.',
        messageId: 1,
        user: '1',
      },
      {
        comment: 'My comment is valuable in this case.',
        messageId: 2,
        user: '1',
      },
      {
        comment: 'The very fact that we are here and alive today is a good sign.',
        messageId: 2,
        user: '3',
      },
      {
        comment: 'You totally stole that from Alex DeMots.',
        messageId: 3,
        user: '2',
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
