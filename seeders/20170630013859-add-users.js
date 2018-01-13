'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        username: 'bill',
        displayname: 'bill williams',
        password: '12345678',
      },
      {
        username: 'sam',
        displayname: 'sam samuelson',
        password: '87654321',
      },
      {
        username: 'alex',
        displayname: 'alex aleksy',
        password: 'abcdefg',
      },
      {
        username: 'jason',
        displayname: 'jason',
        password: 'qwertyui',
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
