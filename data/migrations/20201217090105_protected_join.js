exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('protected_grounds_cases', function (table) {
      table
        .string('protected_ground')
        .references('protected_grounds')
        .inTable('protected_grounds')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('case_id')
        .references('case_id')
        .inTable('cases')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('protected_grounds_cases');
};
