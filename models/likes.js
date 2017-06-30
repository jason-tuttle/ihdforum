'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    // liked: DataTypes.BOOLEAN
  }, {});

  likes.associate = function(models) {
    likes.belongsTo(models.users, { as:'user', foreignKey:'userId'});
    likes.belongsTo(models.messages, {as:'message', foreignKey:'messageId'});
  }

  return likes;
};
