module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Posts',
      [
        {
          id: 1,
          title: 'Post do Ano',
          content: 'Melhor post do ano',
          userId: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Vamos que vamos',
          content: 'Foguete não tem ré',
          userId: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
        {
          id: '7706273476706534553',
          title: 'Latest updates, August 1st',
          content: 'The whole text for the blog post goes here in this key',
          userId: '401465483996',
          published: '2011-08-01T19:58:00.000Z',
          updated: '2011-08-01T19:58:51.947Z',
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
