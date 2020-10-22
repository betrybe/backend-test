module.exports = {
  up: async (queryInterface, Sequelize) => {
    const query = queryInterface.addColumn(
      'Posts', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );

    return query;
  },
  down: (queryInterface) => queryInterface.removeColumn('Posts', 'userId'),
};
