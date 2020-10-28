const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    { timestamps: true, createdAt: 'published', updatedAt: 'updated' },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };

  return Post;
};

module.exports = createPost;
