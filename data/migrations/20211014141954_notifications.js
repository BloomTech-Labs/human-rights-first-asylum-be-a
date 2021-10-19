exports.up = function (knex) {
  return knex.schema.createTable('notifications', (table) => {
    table.increments('notification_id');
    table.string('title', 50).notNullable();
    table.string('text', 280).notNullable();
    table.boolean('read').defaultTo(false);
    table
      .string('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications');
};
