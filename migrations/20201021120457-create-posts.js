module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PosTable = queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE', // Ao atualizar ou excluir um usuário...
        onDelete: 'CASCADE', // ...o seu respectivo post também vai junto
        references: { model: 'Users', key: 'id' },
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    return PosTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),

};
