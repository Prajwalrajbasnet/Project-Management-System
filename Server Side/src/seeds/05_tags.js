exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {
          task_id: 9,
          user_id: 4
        },
        {
          task_id: 10,
          user_id: 5
        }
      ]);
    });
};
