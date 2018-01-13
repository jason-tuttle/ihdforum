'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define(
    'Comment',
    {
      comment: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          Comment.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
          Comment.belongsTo(models.messages, { as: 'message', foreignKey: 'messageId' });
        },
      },
    }
  );
  return Comment;
};
