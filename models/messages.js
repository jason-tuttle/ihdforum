'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    message: DataTypes.STRING
  }, {});
  messages.associate = function(models) {
    messages.belongsTo(models.users, { as:'user', foreignKey:'userId' });
    messages.hasMany(models.likes, { onDelete: 'CASCADE', hooks: true });
  }
  return messages;
};
