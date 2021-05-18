const db = require('../../data/db-config');

const add = async (data) => {
  return await db('pending_cases').insert(data);
};
const update = async (pending_case_id, data) => {
  return await db('pending_cases').where({ pending_case_id }).update(data);
};
const changeStatus = async (id, newStatus) => {
  return await db('pending_cases')
    .where({ pending_case_id: id })
    .update({ status: newStatus });
};

module.exports = {
  add,
  changeStatus,
  update,
};
