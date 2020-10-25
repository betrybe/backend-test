module.exports = {
  up: async (queryInterface, DataTypes) => {
    const PosTable = queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE', // Ao atualizar ou excluir um usuário...
        onDelete: 'CASCADE', // ...o seu respectivo post também vai junto
        references: { model: 'Users', key: 'id' },
      },
      published: {
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        type: DataTypes.DATE,
      },
      updated: {
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        type: DataTypes.DATE,
      },
    });
    return PosTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),
};
