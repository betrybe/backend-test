module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, { createdAt: 'published', updatedAt: 'updated' });
  // based on: https://stackoverflow.com/questions/14653913/rename-node-js-sequelize-timestamp-columns/31078884

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Post;
};
