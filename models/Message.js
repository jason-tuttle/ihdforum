'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('messages', {
    message: DataTypes.STRING,
    user: DataTypes.STRING,
  }, {});
  Message.associate = function(models) {
    Message.hasMany(models.likes, { as:'likes', foreignKey:'messageId', onDelete: 'cascade'});
    Message.hasMany(models.comments, { as:'comments', foreignKey:'messageId', onDelete:'cascade'});
  };
  return Message;
};
