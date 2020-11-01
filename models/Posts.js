const Post = (sequelize, DataTypes) => sequelize.define('Posts', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: { type: DataTypes.INTEGER, foreignKey: true },
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
},
{
  timestamps: true,
  createdAt: 'published',
  updatedAt: 'updated',
  deletedAt: false,
});

module.exports = Post;
