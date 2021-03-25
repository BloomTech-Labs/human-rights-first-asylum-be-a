exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('negative_join', function (table) {
      table
        .string('negative_word')
        .references('negative_tag')
        .inTable('negative_tags')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('judge_id')
        .references('judge_id')
        .inTable('judges')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('negative_join');
};
