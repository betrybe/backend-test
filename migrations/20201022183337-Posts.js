module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    }, // esse é o id que referência usuário que é o autor do post
    published: Sequelize.DATE,
    updated: Sequelize.DATE,
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
