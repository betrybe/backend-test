module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
    deletedAt: false,
  });

  post.associate = ({ User }) => {
    post.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  };

  return post;
};
