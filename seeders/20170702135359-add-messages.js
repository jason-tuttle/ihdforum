'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('messages', [
      {
        message: 'This is the very first message, written as a test.',
        user: '1',
      },
      {
        message: 'This is the very next message, also written as a test.',
        user: '1',
      },
      {
        message: 'The very fact that we are here and alive today is a good sign.',
        user: '3',
      },
      {
        message: 'You totally stole that from Alex DeMots.',
        user: '2',
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('messages', null, {});
  },
};
