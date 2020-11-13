const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '"title" is required',
        },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        msg: '"content" is required',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  }, { timestamps: true, updatedAt: 'updated', createdAt: 'published' });

  Post.associate = (model) => {
    Post.belongsTo(model.User, { as: 'user', foreignKey: 'userId' });
  };
  return Post;
};

module.exports = createPost;
