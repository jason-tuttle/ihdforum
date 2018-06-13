'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    picture: DataTypes.STRING,
    name: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.messages, { as:'messages', foreignKey:'userId'});
    User.hasMany(models.likes, {as:'likes', foreignKey:'userId', onDelete: 'cascade'});
    User.hasMany(models.comments, { as: 'comments', foreignKey:'userId', onDelete: 'cascade' });
  };
  return User;
};
