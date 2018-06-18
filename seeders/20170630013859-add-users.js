'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        username: 'bill',
        displayname: 'bill williams',
        password: '12345678',
        name: 'bill williams',
        picture: '',
        user_id: '1',
        nickname: 'Bill',
        email: 'bill@email.com',
        email_verified: true,
      },
      {
        username: 'sam',
        displayname: 'sam samuelson',
        password: '87654321',
        name: 'sam samuelson',
        picture: '',
        user_id: '2',
        nickname: 'Sam',
        email: 'sam@email.com',
        email_verified: true,
      },
      {
        username: 'alex',
        displayname: 'alex aleksy',
        password: 'abcdefg',
        name: 'alex aleksy',
        picture: '',
        user_id: '3',
        nickname: 'Alex',
        email: 'alex@email.com',
        email_verified: true,
      },
      {
        username: 'jason',
        displayname: 'jason',
        password: 'qwertyui',
        name: 'jason tuttle',
        picture: '',
        user_id: '4',
        nickname: 'Jason',
        email: 'jaudio@mac.com',
        email_verified: true,
      },
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
