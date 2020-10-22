module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    { timestamps: true, createdAt: 'published', updatedAt: 'updated' },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};
