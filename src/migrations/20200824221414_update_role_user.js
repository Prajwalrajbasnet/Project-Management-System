exports.up = function (knex) {
  return knex.schema.table('user', (table) => {
    table.string('role', 80).defaultTo('engineer');
  });
};

exports.down = function (knex) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('role');
  });
};
