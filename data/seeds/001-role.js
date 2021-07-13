const roles = [
  { role_id: 1, role_name: 'admin' },
  { role_id: 2, role_name: 'moderator' },
  { role_id: 3, role_name: 'user' },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert(roles);
    });
};
