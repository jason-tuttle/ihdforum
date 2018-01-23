'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'likes',
      'messageId',
      {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'messages',
          key: 'id'
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'likes',
      'messageId'
    );
  }
};
