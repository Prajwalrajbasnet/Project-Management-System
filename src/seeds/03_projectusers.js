exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projectusers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('projectusers').insert([
        {
          p_id: 33,
          user_id: 3
        },
        {
          p_id: 34,
          user_id: 3
        },
        {
          p_id: 33,
          user_id: 2
        },
        {
          p_id: 33,
          user_id: 7
        },
        {
          p_id: 34,
          user_id: 4
        }
      ]);
    });
};
