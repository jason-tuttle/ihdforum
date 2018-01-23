'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('likes', {
    // liked: DataTypes.BOOLEAN
  }, {});

  Like.associate = function(models) {
    Like.belongsTo(models.users);
    Like.belongsTo(models.messages);
  };

  return Like;
};
