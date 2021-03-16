exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('social_join', function (table) {
      table
        .string('social_group')
        .references('social_tag')
        .inTable('social_tags')
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
  return knex.schema.dropTableIfExists('social_join');
};
