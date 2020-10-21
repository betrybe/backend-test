const PostsModel = (sequelize, DataTypes) => sequelize.define('Posts', {
  id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  published: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
  updated: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.BIGINT, allowNull: false },
});

module.exports = PostsModel;
