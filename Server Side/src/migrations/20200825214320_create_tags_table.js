exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table.integer('task_id').notNullable();
    table.integer('user_id').notNullable();
    table.primary(['task_id', 'user_id']);
    table.foreign('task_id').references('task_id').inTable('task').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
