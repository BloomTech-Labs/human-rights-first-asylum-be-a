exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('notif_types', function (table) {
      table.increments('notif_id');
      table.string('notif_name').notNullable();
      table.string('notif_description').notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('notif_types');
};
