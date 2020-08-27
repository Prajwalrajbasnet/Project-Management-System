exports.up = function (knex) {
  return knex.schema.table('user', (table) => {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
};
