'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('likes', [
      {
        user: 'auth0|5b154f2b157859716f2c1232',
        messageId: 1,
      },
      {
        user: 'google-oauth2|112109242494166402587',
        messageId: 1,
      },
      {
        user: 'twitter|62883362',
        messageId: 1,
      },
      {
        user: 'auth0|5b154f2b157859716f2c1232',
        messageId: 2,
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('likes', null, {});
  },
};
