exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notif_to_users', function (table) {
      table.increments('id');
      table
        .string('user_id')
        .references('user_id')
        .inTable('profiles')
        .onDelete('RESTRICT');
      table
        .integer('notif_id')
        .references('notif_id')
        .inTable('notif_types')
        .onDelete('RESTRICT');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notif_to_users');
};
