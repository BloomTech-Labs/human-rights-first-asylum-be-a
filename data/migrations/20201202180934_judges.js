exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('judges', function (table) {
      table.string('judge_name').notNullable().unique().primary();
      table.string('judge_county');
      table.string('judge_image');
      table.string('date_appointed');
      table.string('birth_date');
      table.string('biography');
      table.string('positive_keywords');
      table.string('negative_keywords');
      table.float('denial_rate');
      table.float('approval_rate');
      table.string('appointed_by');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('judges');
};
