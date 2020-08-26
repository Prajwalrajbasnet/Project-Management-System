exports.up = function (knex) {
  return knex.schema.createTable('project', (table) => {
    table.increments('id').primary();
    table.string('name', 120).notNullable().unique();
    table.text('description');
    table.integer('project_manager').notNullable();
    table.foreign('project_manager').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('project');
};
