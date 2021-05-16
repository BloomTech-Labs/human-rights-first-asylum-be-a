const db = require('../../data/db-config');

const add = async (data) => {
  return await db('pending_cases').insert(data);
};

module.exports = {
  add,
};
