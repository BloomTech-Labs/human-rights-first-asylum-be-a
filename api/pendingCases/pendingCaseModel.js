const db = require('../../data/db-config');

const getAll = () => {
  return db('pending_cases');
};

const getByUserId = (user_id) => {
  return db('pending_cases').where({ user_id });
};
const getByCaseId = (pending_case_id) => {
  return db('pending_cases').where({ pending_case_id }).first();
};
const add = async (data) => {
  return await db('pending_cases').insert(data);
};
const update = async (pending_case_id, data) => {
  return await db('pending_cases').where({ pending_case_id }).update(data);
};
const remove = async (pending_case_id) => {
  return await db('pending_cases').where({ pending_case_id }).del();
};
const changeStatus = async (id, newStatus) => {
  return await db('pending_cases')
    .where({ pending_case_id: id })
    .update({ status: newStatus });
};
module.exports = {
  add,
  getAll,
  remove,
  getByUserId,
  update,
  changeStatus,
  getByCaseId,
};
