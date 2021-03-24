exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('approved-cases', function (table) {
      table.string('case_id').notNullable().primary();
      table.string('case_url');
      table.boolean('initial_or_appellate');
      table.string('hearing_date');
      table.string('judge');
      table.string('case_origin');
      table.boolean('case_filed_within_one_year');
      table.string('application_type');
      table.string('protected_ground');
      table.string('case_outcome');
      table.string('nation_of_origin');
      table.string('applicant_sex'); // should this be gender identity
      table.string('type_of_violence_experienced');
      table.string('applicant_indigenous_group');
      table.string('applicant_language');
      table.boolean('applicant_access_to_interpreter');
      table.boolean('applicant_perceived_credibility');
      //table.string('case_status'); This field is not present pending a review by the stakeholder. Also present in Seeds, bookmark case, approved case and unapproved case tables
      //table.string('hearing_type'); This field is not present pending a review by the stakeholder. Also present in Seeds, bookmark case, approved case and unapproved case tables
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('approved-cases');
};
