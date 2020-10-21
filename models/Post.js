module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: DataTypes.DATE,
    },
    { timestamps: true, createdAt: 'published', updatedAt: 'updated' },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'posts', foreignKey: 'user_id' });
  };

  return Post;
};
