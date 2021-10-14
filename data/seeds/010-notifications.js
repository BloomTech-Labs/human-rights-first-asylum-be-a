exports.seed = function (knex) {
  const notifications = [
    {
      notification_id: '1',
      title: 'Uploaded Case',
      text: 'Successfully uploaded case.',
      user_id: '8',
    },
    {
      notification_id: '2',
      title: 'User registration',
      text: 'A new user has requested to join the application.',
      user_id: '8',
    },
    {
      notification_id: '3',
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
