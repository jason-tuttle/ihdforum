'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('likes', {
    user: DataTypes.STRING,
  }, {});

  Like.associate = function(models) {
    Like.belongsTo(models.messages);
  };

  return Like;
};
