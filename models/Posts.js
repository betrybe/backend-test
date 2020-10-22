const BlogPosts = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, { createdAt: 'published', updatedAt: 'updated' });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};

module.exports = BlogPosts;
