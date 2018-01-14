'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define(
    'users',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      displayname: DataTypes.STRING,
    },
    {}
  );
  users.associate = function(models) {
    users.hasMany(models.messages, { as: 'messages', foreignKey: 'userId' });
    users.hasMany(models.likes, { as: 'likes', foreignKey: 'userId', onDelete: 'cascade' });
    users.hasMany(models.comment, { as: 'comments', foreignKey: 'userId', onDelete: 'cascade' });
  };
  return users;
};
