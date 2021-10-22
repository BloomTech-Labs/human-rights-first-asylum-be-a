exports.seed = function (knex) {
  const notifications = [
    {
      title: 'Uploaded Case',
      text: 'Successfully uploaded case.',
      user_id: '8',
    },
    {
      title: 'User registration',
      text: 'A new user has requested to join the application.',
      user_id: '8',
    },
    {
      title: 'User case',
      text: 'A user has requested to upload a case.',
      user_id: '7',
    },
  ];

  return knex('notifications')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert(notifications);
    });
};
