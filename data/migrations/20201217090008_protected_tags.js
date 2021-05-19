exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('protected_grounds', function (table) {
      table.string('protected_grounds').notNullable().unique().primary();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('protected_grounds');
};
