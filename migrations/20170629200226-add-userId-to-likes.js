'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'likes',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'likes',
      'userId'
    );
  }
};
