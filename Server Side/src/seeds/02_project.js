exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('project')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('project').insert([
        {
          id: 33,
          description:
            'Minimal project management system capable of managing projects with hierarchy of different users',
          name: 'Project Management System',
          project_manager: 1
        },
        {
          id: 34,
          description: 'App to store streak based on the habit you create and provide analysis and other',
          name: 'Steak App',
          project_manager: 6
        }
      ]);
    });
};
