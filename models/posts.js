module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  Post.associate = (models) => {
    Post.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
  };
  // https://www.youtube.com/watch?v=CMc7IVdYumw&ab_channel=ThomasW.Smith
  return Post;
};
