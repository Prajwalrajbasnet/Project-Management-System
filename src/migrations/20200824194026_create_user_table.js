exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments().primary();
    table.string('fname', 110).notNullable();
    table.string('lname', 110).notNullable();
    table.string('email', 255).notNullable();
    table.string('username', 80).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
