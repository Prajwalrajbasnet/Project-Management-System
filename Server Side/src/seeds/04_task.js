exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('task')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {
          task_id: 9,
          title: 'Model relationships',
          description: 'Finish all the mapping of relations and create model for them',
          project_id: 33,
          assignee: 5
        },
        {
          task_id: 10,
          title: 'Expose with API',
          description: 'Create routes and controllers for CRUD operations',
          project_id: 33,
          assignee: 5
        }
      ]);
    });
};
