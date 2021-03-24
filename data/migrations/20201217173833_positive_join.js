exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('positive_join', function (table) {
      table
        .string('positive_word')
        .references('positive_tag')
        .inTable('positive_tags')
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
  return knex.schema.dropTableIfExists('positive_join');
};
