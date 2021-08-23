exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('judges_to_case', function (table) {
      table.string('case_id');
      table.integer('judge_id');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('judges_to_case');
};
