'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, { as:'messages', foreignKey:'userId'});
    User.hasMany(models.Like, {as:'likes', foreignKey:'userId', onDelete: 'cascade'});
  }
  return User;
};
