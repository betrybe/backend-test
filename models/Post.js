const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE },
  {
    timestamps: false,
  });
  return Post;
};

module.exports = Posts;
