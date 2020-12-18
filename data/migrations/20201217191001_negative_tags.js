exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('negative_tags', function (table) {
      table.string('negative_tag').notNullable().unique().primary();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('negative_tags');
};
