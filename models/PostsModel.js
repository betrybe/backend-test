const PostsModel = (sequelize, DataTypes) => sequelize.define('Posts', {
  id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = PostsModel;
