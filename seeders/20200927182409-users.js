module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 401465483996,
          displayName: 'Brett Wiltshire',
          email: 'brett@email.com',
          password: '123456',
          image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
        },
      ],
      {},
    ),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
