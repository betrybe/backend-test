const PostsModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
    published: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
    updated: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.BIGINT, allowNull: false },
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};

module.exports = PostsModel;
