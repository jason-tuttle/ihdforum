'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users',
    [{
      username: 'bill',
      displayname: 'bill williams',
      password: '12345678'
    },
    {
      username: 'sam',
      displayname: 'sam samuelson',
      password: '87654321'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('users', null, {});
  }
};
