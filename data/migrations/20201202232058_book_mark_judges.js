exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('book_mark_judges', function (table) {
      table
        .string('user_id')
        .references('id')
        .inTable('profiles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('judge_name')
        .references('judge_name')
        .inTable('judges')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('book_mark_judges');
};
