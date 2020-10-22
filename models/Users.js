const createUser = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  // Relacionamento 1:N
  Users.associate = (models) => {
    Users.hasMany(models.Posts,
      { foreignKey: 'userId', as: 'posts' });
  };

  return Users;
};

module.exports = createUser;
