exports.up = function (knex) {
  return knex.schema.table('project_user', (table) => {
    table.dropForeign('project_id');
    table.dropForeign('user_id');
    table.foreign('project_id').references('id').inTable('project').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.table('project_user', (table) => {
    table.dropForeign('project_id');
    table.dropForeign('user_id');
  });
};
