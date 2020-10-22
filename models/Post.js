module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    { timestamps: true, createdAt: 'published', updatedAt: 'updated' },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Post;
};
