exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('cases', function (table) {
      table.string('case_id').notNullable().primary();
      table.string('case_url');
      table.boolean('initial_or_appellate');
      table.string('hearing_date');
      table.string('judge');
      table.boolean('initial_or_appellate');
      table.string('case_origin');
      table.boolean('case_filed_within_one_year');
      table.string('application_type');
      table.boolean('protected_ground');
      table.string('case_outcome');
      table.string('nation_of_origin');
      table.string('applicant_sex'); // should this be gender identity
      table.string('type_of_violence_experienced');
      table.string('applicant_indigenous_group');
      table.string('applicant_language');
      table.string('applicant_access_to_interpreter');
      table.string('applicant_perceived_credibility');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('cases');
};
