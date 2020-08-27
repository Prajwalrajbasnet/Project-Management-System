exports.up = function (knex) {
  return knex.schema.createTable('project_user', (table) => {
    table.integer('project_id').notNullable();
    table.integer('user_id').notNullable();
    table.primary(['project_id', 'user_id']);
    table.foreign('project_id').references('id').inTable('project');
    table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('project_user');
};
