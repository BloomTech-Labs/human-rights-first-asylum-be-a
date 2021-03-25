exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('protected_join', function (table) {
      table
        .string('protected_ground')
        .references('ground_tag')
        .inTable('protected_tags')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('case_id')
        .references('primary_key')
        .inTable('cases')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('protected_join');
};
