exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('judges', function (table) {
      table.string('judge_id').notNullable().unique().primary();
      table.string('name');
      table.string('judge_county');
      table.string('judge_image');
      table.string('date_appointed');
      table.string('birth_date');
      table.string('biography');
      table.float('denial_rate');
      table.float('approval_rate');
      table.string('appointed_by');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('judges');
};
