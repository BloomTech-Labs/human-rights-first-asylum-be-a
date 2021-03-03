exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('unapproved_cases', function (table) {
      table.string('id').notNullable().primary();
      table.string('case_url');
      table.string('court_type');
      table.string('hearing_type');
      table.string('refugee_origin');
      table.string('hearing_location');
      table.string('hearing_date');
      table.string('decision_date');
      table.string('credibility_of_refugee');
      table.string('determined_applicant_credibility');
      table.string('applicant_access_to_interpreter');
      table.string('is_applicant_indigenous');
      table.string('applicant_language');
      table.string('one_year_guideline');
      table.string('case_status');
      table.string('judge_decision');
      table.string('judge_name');
      table.string('submissionStatus').defaultTo('pending');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('unapproved_cases');
};
