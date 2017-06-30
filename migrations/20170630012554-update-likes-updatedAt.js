'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'likes',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'likes',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    );
  }
};
