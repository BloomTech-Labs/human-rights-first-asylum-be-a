exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('cases', function (table) {
      table.string('id').notNullable().primary();
      table.string('case_url');
      table.string('court_type');
      table.string('hearing_type');
      table.string('refugee_origin');
      table.string('hearing_location');
      table.string('protected_ground');
      table.string('hearing_date');
      table.string('decision_date');
      table.string('credibility_of_refugee');
      table.string('case_status');
      table.string('social_group_type');
      table.string('judge_decision');
      table.string('judge_name');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('cases');
};
