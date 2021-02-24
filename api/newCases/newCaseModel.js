const db = require('../../data/db-config');

const getAll = () => {
  return db('unapproved_cases');
};

const add = async (data) => {
  return await db('unapproved_cases').insert(data);
};

module.exports = {
  add,
  getAll,
};
