exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('book_mark_cases', function (table) {
      table.increments('bookmark_cases_id');
      table
        .string('user_id')
        .references('user_id')
        .inTable('profiles')
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

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('book_mark_cases');
};
