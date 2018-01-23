'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('messages', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User, { as:'user', foreignKey:'userId' });
    Message.hasMany(models.Like, { as:'likes', foreignKey:'messageId', onDelete: 'cascade'});
  }
  return Message;
};
