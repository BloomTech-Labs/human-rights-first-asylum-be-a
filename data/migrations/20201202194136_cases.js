exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('cases', function (table) {
      table.string('primary_key').notNullable().primary();
      table
        .string('user_id')
        .references('id')
        .inTable('profiles')
        .onDelete('RESTRICT');
      table.string('case_id');
      table.string('case_url');
      table.boolean('initial_or_appellate');
      table.string('hearing_date');
      table.string('judge').notNullable(); //Feature solution requires data science to be scraping this data
      table.string('case_origin');
      table.boolean('case_filed_within_one_year');
      table.string('application_type');
      table.string('protected_ground');
      table.string('case_outcome');
      table.string('nation_of_origin');
      table.string('applicant_gender');
      table.string('type_of_violence_experienced');
      table.string('applicant_indigenous_group');
      table.string('applicant_language');
      table.boolean('applicant_access_to_interpreter');
      table.boolean('applicant_perceived_credibility');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('cases');
};
