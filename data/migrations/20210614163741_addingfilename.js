exports.up = function (knex) {
  return knex.schema.table('cases', (table) => {
    table.string('file_name');
  });
};

exports.down = function (knex) {
  return knex.schema.table('cases', (table) => {
    table.dropColumn('file_name');
  });
};
