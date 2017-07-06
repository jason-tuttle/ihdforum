'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('likes', ['messageId'], {
      type: 'FOREIGN KEY',
      references: { //Required field
        table: 'messages',
        field: 'id'
      },
      onDelete: 'cascade'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('likes', ['messageId'], {
      type: 'FOREIGN KEY',
      references: { //Required field
        table: 'messages',
        field: 'id'
      },
      onDelete: 'cascade'
    });
  }
};
