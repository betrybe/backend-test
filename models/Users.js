const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    image: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts,
      { foreignKey: 'id', as: 'posts' });
  };

  return Users;
};

module.exports = createUsers;
