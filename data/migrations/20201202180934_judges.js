exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('judges', function (table) {
      table.increments('judge_id');
      table.string('first_name');
      table.string('middle_initial');
      table.string('last_name');
      table.string('county');
      table.string('image_url');
      table.date('date_appointed');
      table.string('biography');
      table.string('appointed_by');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('judges');
};
