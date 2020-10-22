const createPostModel = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
  },
  { timestamps: true, createdAt: 'published', updatedAt: 'updated' });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
  };
  return Post;
};

module.exports = createPostModel;
