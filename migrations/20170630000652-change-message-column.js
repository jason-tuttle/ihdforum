'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'messages',
      'message',
      {
        type: Sequelize.STRING(140),
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'messages',
      'message',
      {
        type: Sequelize.STRING
      }
    );
  }
};
