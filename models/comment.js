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
          comment.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
          comment.belongsTo(models.messages, { as: 'message', foreignKey: 'messageId' });
        },
      },
    }
  );
  return Comment;
};
