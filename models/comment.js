'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define(
    'comment',
    {
      comment: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          comment.belongsTo(models.users);
          comment.belongsTo(models.messages);
        },
      },
    }
  );
  return comment;
};
