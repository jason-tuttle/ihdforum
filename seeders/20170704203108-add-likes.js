'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('likes', [
      {
        userId: 1,
        messageId: 1
      },
      {
        userId: 2,
        messageId: 1
      },
      {
        userId: 3,
        messageId: 1
      },
      {
        userId: 4,
        messageId: 1
      }
    ], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('likes', null, {});
  }
};
