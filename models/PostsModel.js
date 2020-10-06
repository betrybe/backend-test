const PostsModel = (sequelize, DataTypes) => sequelize.define('BlogPosts', {
  id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  published: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
  updated: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  user_id: { type: DataTypes.BIGINT, allowNull: false },
});

module.exports = PostsModel;
