module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
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

  Post.associate = (models) => {
    Post.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};
