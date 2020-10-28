// module.exports = {
//   up: async (queryInterface, Sequelize) =>
//     queryInterface.createTable('Posts', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       title: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       content: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       userId: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       published: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//       updated: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//     }),
//   down: async (queryInterface) => queryInterface.dropTable('Posts'),
// };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'published',
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Posts');
  },
};
