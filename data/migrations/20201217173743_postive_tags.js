exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('positive_tags', function (table) {
      table.string('positive_tag').notNullable().unique().primary();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('positive_tags');
};
