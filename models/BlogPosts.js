const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });
  Posts.associate = (models) => {
    Posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'posts' });
  };
  return Post;
};

module.exports = Posts;
