const { Sequelize } = require('sequelize');

const Post = (sequelize, DataTypes) => {
  const PostObject = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      updated: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    },
    {
      timestamps: false,
    },
  );

  return PostObject;
};

module.exports = Post;
