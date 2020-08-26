exports.up = function (knex) {
  return knex.schema.createTable('projectusers', (table) => {
    table.integer('p_id').notNullable();
    table.integer('user_id').notNullable();
    table.primary(['p_id', 'user_id']);
    table.foreign('p_id').references('p_id').inTable('project');
    table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('projectusers');
};
