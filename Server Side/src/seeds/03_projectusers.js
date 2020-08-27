exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('project_user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('project_user').insert([
        {
          project_id: 33,
          user_id: 3
        },
        {
          project_id: 34,
          user_id: 3
        },
        {
          project_id: 33,
          user_id: 2
        },
        {
          project_id: 33,
          user_id: 7
        },
        {
          project_id: 34,
          user_id: 4
        }
      ]);
    });
};
