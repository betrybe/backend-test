const { DataTypes } = require('sequelize/types');
const { sequelize } = require('.');

const createPosts = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  // Relacionamento 1:1
  Posts.associate = (models) => {
    Posts.hasOne(models.Users,
      { foreignKey: 'id', as: 'users' });
  };

  return Posts;
};

module.exports = createPosts;
