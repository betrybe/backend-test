const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      published: { type: DataTypes.DATE, allowNull: false },
      updated: { type: DataTypes.DATE, allowNull: false },
    },
    {
      timestamps: false,
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'userId',
    });
  };

  return Post;
};

module.exports = Posts;
