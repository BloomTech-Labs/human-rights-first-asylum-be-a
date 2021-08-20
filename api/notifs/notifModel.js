const db = require('../../data/db-config');

const getAllNotifTypes = () => {
  return db('notif_types');
};

const getNotifById = (notif_id) => {
  return db('notif_types').where({ notif_id }).first();
};

const getNotifByName = (notif_name) => {
  return db('notif_types').where({ notif_name }).first();
};

module.exports = {
  getAllNotifTypes,
  getNotifById,
  getNotifByName,
};
