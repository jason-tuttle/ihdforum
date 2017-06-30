'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'likes',
      'createdAt',
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
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    );
  }
};
