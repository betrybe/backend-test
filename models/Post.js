module.exports = (sequelize, _DataTypes) => {
  const Post = sequelize.define('Posts', {});

  return Post;
};
