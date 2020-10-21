const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'posts' });
  };
  return Post;
};

module.exports = Posts;
