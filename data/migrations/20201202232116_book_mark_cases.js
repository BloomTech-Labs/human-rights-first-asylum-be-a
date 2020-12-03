exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('book_mark_cases', function (table) {
      table.string('user_id').references('id').inTable('profiles').cascade();
      table.string('case_id').references('id').inTable('cases').cascade();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('book_mark_cases');
};
