exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('social_tags', function (table) {
      table.string('social_tag').notNullable().unique().primary();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('social_tags');
};
