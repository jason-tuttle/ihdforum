'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    message: DataTypes.STRING
  }, {});
  messages.associate = function(models) {
    messages.belongsTo(models.users, { as:'user', foreignKey:'userId' });
  }
  return messages;
};
