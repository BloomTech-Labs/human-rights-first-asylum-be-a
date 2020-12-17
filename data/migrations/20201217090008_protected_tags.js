exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('protected_tags', function (table) {
      table.string('ground_tag').notNullable().unique().primary();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('protected_tags');
};
