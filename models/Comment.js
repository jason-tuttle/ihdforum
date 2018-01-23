'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comments', {
    comment: DataTypes.STRING, 
  }, {});

  Comment.associate = function(models) {
    Comment.belongsTo(models.users);
    Comment.belongsTo(models.messages);
  };
  return Comment;
};
