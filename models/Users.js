const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
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
