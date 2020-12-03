exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('judge_countries', function (table) {
      table
        .string('country_name')
        .unsigned()
        .references('country_name')
        .inTable('country')
        .cascade();
      table
        .string('judge_name')
        .unsigned()
        .references('judge_name')
        .inTable('judges')
        .cascade();
      table.float('approval_rate');
      table.float('denial_rate');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('judge_countries');
};
