'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('likes', [
      {
        user: '1',
        messageId: 1,
      },
      {
        user: '2',
        messageId: 1,
      },
      {
        user: '3',
        messageId: 1,
      },
      {
        user: '4',
        messageId: 1,
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('likes', null, {});
  },
};
