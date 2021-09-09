exports.up = function (knex) {
  // return knex.schema.createTable('ds_cases', function (table) {
  //   table.increments();
  //   table.string('uuid');
  //   table.string('panel_members');
  //   table.string('decision_type');
  //   table.string('application_type');
  //   table.string('date');
  //   table.string('country_of_origin');
  //   table.string('outcome');
  //   table.string('case_origin_state');
  //   table.string('case_origin_city');
  //   table.string('protected_grounds');
  //   table.string('type_of_persecution');
  //   table.string('gender');
  //   table.string('credibility');
  //   table.string('check_for_one_year');
  // });
};
//here
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('ds_cases');
};
