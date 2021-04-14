const db = require('../../data/db-config');
const { v4: uuidv4 } = require('uuid');

const getAll = () => {
  return db('unapproved_cases');
};

const getById = (id) => {
  return db('unapproved_cases').where({ id });
};

const add = async (data) => {
  return await db('unapproved_cases').insert(data);
};

const approve = async (id) => {
  const approvedCases = await db('unapproved_cases').where({ primary_key: id });
  const approvedCase = approvedCases[0];
  approvedCase['primary_key'] = uuidv4();
  await db('cases').insert(approvedCase);
  await db('unapproved_cases').where({ primary_key: id }).del();
  return await db('cases').where({ primary_key: id });
};

const remove = async (id) => {
  return await db('unapproved_cases').where({ primary_key: id }).del();
};

module.exports = {
  add,
  getAll,
  remove,
  getById,
  approve,
};
