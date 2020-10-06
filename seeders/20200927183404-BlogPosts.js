module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'BlogPosts',
    [
      {
        id: 7706273476706534553,
        published: '2011-08-01T19:58:00.000Z',
        updated: '2011-08-01T19:58:51.947Z',
        title: 'Latest updates, August 1st',
        content: 'The whole text for the blog post goes here in this key',
        user_id: 401465483996,
      },
    ],
    {},
  ),

  down: async (queryInterface) => queryInterface.bulkDelete('BlogPosts', null, {}),
};
