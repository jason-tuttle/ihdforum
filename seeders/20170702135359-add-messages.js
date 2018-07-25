'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('messages', [
      {
        message: 'This is the very first message, written as a test.',
        user: 'auth0|5b154f2b157859716f2c1232',
      },
      {
        message: 'This is the very next message, also written as a test.',
        user: 'auth0|5b154f2b157859716f2c1232',
      },
      {
        message: 'The very fact that we are here and alive today is a good sign.',
        user: 'google-oauth2|112109242494166402587',
      },
      {
        message: 'You totally stole that from Alex DeMots.',
        user: 'twitter|62883362',
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('messages', null, {});
  },
};
