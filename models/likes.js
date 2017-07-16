'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    // liked: DataTypes.BOOLEAN
  }, {});

  likes.associate = function(models) {
    likes.belongsTo(models.users);
    likes.belongsTo(models.messages);
  };

  return likes;
};
