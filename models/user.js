const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  users.associate = (models) => {
    users.hasMany(models.posts, { foreignKey: 'userId', as: 'posts' });
  };

  return users;
};

module.exports = Users;
