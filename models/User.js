const createUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
        unique: {
          msg: 'Usuário já existe',
        },
        allowNull: false,
        validate: {
          isEmail: {
            msg: '"email" must be a valid email',
          },
          notNull: {
            msg: '"email" is required',
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
