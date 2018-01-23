'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define(
    'comments',
    {
      comment: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          Comment.belongsTo(models.User);
          Comment.belongsTo(models.Message);
        },
      },
    }
  );
  return Comment;
};
