exports.up = function (knex) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('role');
  });
};

exports.down = function (knex) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('role');
  });
};
