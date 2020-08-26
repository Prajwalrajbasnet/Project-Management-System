exports.up = function (knex) {
  return knex.schema.table('projectusers', (table) => {
    table.dropForeign('p_id');
    table.dropForeign('user_id');
    table.foreign('p_id').references('p_id').inTable('project').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.table('projectusers', (table) => {
    table.dropForeign('p_id');
    table.dropForeign('user_id');
  });
};
