exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('faq', function (table) {
      table.increments('faq_id');
      table.string('question', 1000).notNullable();
      table.string('answer', 1000).notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('faq');
};
