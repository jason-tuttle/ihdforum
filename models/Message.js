'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('messages', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.users, { as:'user', foreignKey:'userId' });
    Message.hasMany(models.likes, { as:'likes', foreignKey:'messageId', onDelete: 'cascade'});
  }
  return Message;
};
