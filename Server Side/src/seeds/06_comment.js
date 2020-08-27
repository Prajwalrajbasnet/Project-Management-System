exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comment')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {
          comment: 'you need to finish this task 1hr before deadline',
          task_id: 9,
          commented_by: 4
        },
        {
          comment: 'anyone willing to help me with the design?',
          task_id: 10,
          commented_by: 5
        }
      ]);
    });
};
