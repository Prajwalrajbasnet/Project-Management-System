exports.up = function (knex) {
  return knex.schema.createTable('comment', (table) => {
    table.increments('comment_id').primary();
    table.text('comment').notNullable();
    table.timestamp('commented_at').defaultTo(knex.fn.now());
    table.integer('task_id').notNullable();
    table.integer('commented_by');
    table.foreign('task_id').references('task_id').inTable('task').onDelete('CASCADE');
    table.foreign('commented_by').references('id').inTable('user').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comment');
};
