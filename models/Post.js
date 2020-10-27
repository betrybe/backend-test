const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE },
  {
    timestamps: false,
  });
  return Post;
};

module.exports = Posts;
