const Posts = (sequelize, DataTypes) => {
  const posts = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  // Relacionamento 1:1
  posts.associate = (models) => {
    posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = Posts;
