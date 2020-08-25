exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1,
          fname: 'Daniel',
          lname: 'Bryan',
          email: 'yesman@gmail.com',
          username: 'yessman',
          password: 'briebella',
          role: 'project manager'
        },
        {
          id: 2,
          fname: 'John',
          lname: 'Cena',
          email: 'mytimeisnow@yahoo.com',
          username: 'mrnobody',
          password: 'briebella'
        }
      ]);
    });
};
