// const createPostModel = (sequelize, DataTypes) => {
//   const Post = sequelize.define('Post', {
//     title: DataTypes.STRING,
//     content: DataTypes.STRING,
//   },
//   { timestamps: true, createdAt: 'published', updatedAt: 'updated' });

//   Post.associate = (models) => {
//     Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
//   };

//   return Post;
// };

// module.exports = createPostModel;

const createPost = (sequelize, DataTypes) => {
  const posts = sequelize.define('Post', {
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

  posts.associate = (models) => {
    posts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = createPost;
