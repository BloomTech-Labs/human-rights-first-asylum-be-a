exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('pending_profiles', function (table) {
      table.increments('id');
      table.string('email').notNullable().unique();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('pending_profiles');
};
