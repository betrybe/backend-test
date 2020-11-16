const { Sequelize } = require("sequelize/types");

const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      published: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    },
    {
      timestamps: false,
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'userId',
    });
  };

  return Post;
};

module.exports = Posts;
