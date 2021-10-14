const db = require('../../data/db-config');

const getAll = (profile_id) => {
  return db('notifications').where('user_id', profile_id).where('read', false);
};

const getOne = (notification_id) => {
  return db('notifications').where('notification_id', notification_id).first();
};

const markAsRead = async (notification_id) => {
  await db('notifications')
    .where('notification_id', notification_id)
    .update('read', true);
  return `Notification ID ${notification_id} is marked as read`;
};

module.exports = {
  getAll,
  getOne,
  markAsRead,
};
