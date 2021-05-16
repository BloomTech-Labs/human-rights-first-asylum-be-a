const db = require('../../data/db-config');

const add = async (data) => {
  return await db('pending_cases').insert(data);
};

const changeStatus = (id, newStatus) => {
  return db('pending_cases')
    .where({ pending_case_id: id })
    .first()
    .update({ status: newStatus })
};

module.exports = {
  add,
  changeStatus,
};
