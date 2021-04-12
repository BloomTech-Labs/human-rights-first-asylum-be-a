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

const approve = async (id, judgeId) => {
  //protected_ground , case_outcome, hearing_date will be added
  const approvedCase = await db('unapproved_cases').where({ primary_key: id });
  approvedCase[0]['judge'] = judgeId;
  await db('cases').insert(approvedCase);
  await db('unapproved_cases').where({ primary_key: id }).del();
  console.log(await db('cases').where({ primary_key: id }));
  return await db('cases').where({ primary_key: id });
  // const = await db('cases').insert()
  // add case to the approve-table
  // then remove(data.id);
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
