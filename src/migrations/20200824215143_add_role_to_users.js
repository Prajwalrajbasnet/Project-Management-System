exports.up = function (knex) {
  return knex.schema.table('user', (table) => {
    table.string('role', 60);
  });
};

exports.down = function (knex) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('role');
  });
};
