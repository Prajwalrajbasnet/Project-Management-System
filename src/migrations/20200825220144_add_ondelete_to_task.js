exports.up = function (knex) {
  return knex.schema.table('task', (table) => {
    table.dropForeign('project_id');
    table.dropForeign('assignee');
    table.dropForeign('last_assignee');
    table.foreign('project_id').references('id').inTable('project').onDelete('CASCADE');
    table.foreign('assignee').references('id').inTable('user').onDelete('SET NULL');
    table.foreign('last_assignee').references('id').inTable('user').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.table('task', (table) => {
    table.dropForeign('project_id');
    table.dropForeign('assignee');
    table.dropForeign('last_assignee');
  });
};
