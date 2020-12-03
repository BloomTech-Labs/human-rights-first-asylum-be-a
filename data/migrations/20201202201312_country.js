exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('country', function (table) {
      table.string('country_name').primary();
      table.float('approval_rate');
      table.float('denial_rate');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('country');
};
