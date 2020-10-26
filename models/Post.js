const { Sequelize } = require('sequelize');

const Post = (sequelize, DataTypes) => {
  const PostObject = sequelize.define(
    'Post',
    {
      published: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
      updated: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );

  PostObject.associate = (models) => {
    PostObject.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return PostObject;
};

module.exports = Post;
