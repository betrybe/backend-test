module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });
  Post.associate = (models) => {
    Post.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  // https://www.youtube.com/watch?v=CMc7IVdYumw&ab_channel=ThomasW.Smith
  return Post;
};
