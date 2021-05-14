const db = require('../../data/db-config');
const { v4: uuidv4 } = require('uuid');

const getAll = () => {
  return db('pending_cases');
};

const getById = (user_id) => {
  return db('pending_cases').where({ user_id });
};

const add = async (data) => {
  return await db('pending_cases').insert(data);
};

// reference for future
// const approve = async (id) => {
//   const approvedCases = await db('pending_cases').where({ primary_key: id });
//   const approvedCase = approvedCases[0];
//   approvedCase['primary_key'] = uuidv4();
//   await db('cases').insert(approvedCase);
//   await db('pending_cases').where({ primary_key: id }).del();
//   return await db('cases').where({ primary_key: id });
// };

const remove = async (id) => {
  return await db('pending_cases').where({ primary_key: id }).del();
};

module.exports = {
  add,
  getAll,
  remove,
  getById,
  // approve,
};
