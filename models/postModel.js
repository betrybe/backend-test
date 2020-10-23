const Post = (sequelize, DataTypes) => {
  const newPost = sequelize.define('Post', {
    content: DataTypes.VARCHAR,
    title: DataTypes.VARCHAR,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    update: DataTypes.DATE,
  });
  return newPost;
};

module.exports = Post;
