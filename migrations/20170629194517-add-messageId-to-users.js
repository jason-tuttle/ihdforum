'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'messageId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "messages",
        key: "id"
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'messageId');
  }
};
