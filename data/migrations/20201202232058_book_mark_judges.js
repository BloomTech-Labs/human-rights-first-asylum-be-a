exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('book_mark_judges', function (table) {
      table.string('user_id').references('id').inTable('profiles').cascade();
      table.string('judge_id').references('id').inTable('judges').cascade();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('book_mark_judges');
};
