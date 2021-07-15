const roles = [
  { role_id: 1, role_name: 'admin' },
  { role_id: 2, role_name: 'moderator' },
  { role_id: 3, role_name: 'user' },
];

exports.seed = function (knex) {
  return knex('roles')
    .del()
    .then(function () {
      return knex('roles').insert(roles);
    });
};
