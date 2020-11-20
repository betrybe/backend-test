const Post = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'Post',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: { type: DataTypes.DATE, defaultValue: Date.now() },
      updated: { type: DataTypes.DATE, defaultValue: Date.now() },
    },

    {
      timestamps: false,
    },
  );

  post.associate = (models) => {
    post.belongsTo(models.User, {
      foreignKey: 'id', as: 'user_id',
    });
  };

  return post;
};

module.exports = Post;
