const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
    deletedAt: false,
  });

  post.associate = ({ Users }) => {
    post.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
  };

  return post;
};

module.exports = Post;
