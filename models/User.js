const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          min: 8,
          msg: '"displayName" length must be at least 8 characters long',
        },
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: '"email" is required',
        },
        isEmail: {
          msg: '"email" must be a valid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          min: 6,
          msg: '"password" length must be 6 characters long',
        },
        notNull: {
          msg: '"password" is required',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
  return User;
};

module.exports = createUser;
