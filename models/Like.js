'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('likes', {
    // liked: DataTypes.BOOLEAN
  }, {});

  Like.associate = function(models) {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Message);
  };

  return Like;
};
