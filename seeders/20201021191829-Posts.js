// 'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert('Posts',
      [
        {
          id: 3,
          title: 'Latest updates, August 1st',
          content: 'The whole text for the blog post goes here in this key',
          userId: 3,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.947Z'),
        },
      ]),

  down: async (queryInterface) => queryInterface.bulkDelete('Posts', null, {}),
};
