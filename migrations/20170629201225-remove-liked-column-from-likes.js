'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('likes', 'liked');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'likes',
      'liked',
      {
        type: Sequelize.BOOLEAN
      }
    );
  }
};
