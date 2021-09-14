exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('cases', function (table) {
      table.string('case_id').notNullable().primary();
      table
        .integer('judge_id')
        .references('judge_id')
        .inTable('judges')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      table.string('user_id');
      table.string('url');
      table.string('number');
      table.date('decision_date');
      table.string('outcome');
      table.string('country_of_origin');
      table.string('protected_grounds');
      table.string('application_type');
      table.string('case_origin_city');
      table.string('case_origin_state');
      table.string('gender');
      table.string('applicant_language');
      table.string('indigenous_group');
      table.string('type_of_persecution');
      table.boolean('appellate');
      table.string('check_for_one_year').default('unknown');
      table.boolean('credibility');
      table.timestamps(false, true);
      table.string('comment');
      table.string('status');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('cases');
};
