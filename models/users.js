'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    users.hasMany(models.messages, { as:'message', foreignKey:'messageId'});
  }
  return users;
};
