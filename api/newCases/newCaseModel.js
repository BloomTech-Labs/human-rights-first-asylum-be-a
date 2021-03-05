const db = require('../../data/db-config');

const getAll = () => {
  return db('unapproved_cases');
};

const getById = (id) => {
  return db('unapproved_cases').where({ id });
};

const add = async (data) => {
  return await db('unapproved_cases').insert(data);
};

const approve = (data) => {
  // add case to the approve-table
  // then remove(data.id);
};

const remove = async (id) => {
  return await db('unapproved_cases').where({ id: 'sjjjs' }).del();
};

module.exports = {
  add,
  getAll,
  remove,
  getById,
};
