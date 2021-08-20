exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('notif_types')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notif_types').insert([
        {
          notif_id: 0,
          notif_name: 'New User Registration',
          notif_description: 'A new user has requested to join the application',
        },
        {
          notif_id: 1,
          notif_name: 'Judge Report',
          notif_description: 'A judge you follow has handed down a decision',
        },
        {
          notif_id: 2,
          notif_name: 'Case Uploaded',
          notif_description: 'Successfully uploaded case : #example',
        },
        {
          notif_id: 3,
          notif_name: 'New FAQ added',
          notif_description: 'Another admin has addded a FAQ',
        },
      ]);
    });
};
