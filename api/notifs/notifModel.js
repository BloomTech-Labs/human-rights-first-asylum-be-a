const db = require('../../data/db-config');

const getAllNotifs = () => {
  return db('notif_to_users');
};

const getNotifById = (id) => {
  return db('notif_to_users').where({ id }).first();
};

const create = (notif) => {
  return db('notif_to_users').insert(notif).returning('*');
};

const remove = (id) => {
  return db('notif_to_users').where({ id }).del().returning('*');
};

module.exports = {
  getAllNotifs,
  getNotifById,
  create,
  remove,
};
