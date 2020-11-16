const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: { allowNull: false, type: DataTypes.STRING },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, updatedAt: 'updated', createdAt: 'published' });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return Post;
};

module.exports = Posts;
