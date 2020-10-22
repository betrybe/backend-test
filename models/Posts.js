const createPost = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };

  return Posts;
};

module.exports = createPost;
