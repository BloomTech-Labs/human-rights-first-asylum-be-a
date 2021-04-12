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

const approve = async (
  id,
  judgeId,
  protected_ground,
  case_outcome,
  hearing_date
) => {
  const approvedCases = await db('unapproved_cases').where({ primary_key: id });
  const approvedCase = approvedCases[0];
  approvedCase['judge'] = judgeId;
  approvedCase['protected_ground'] = protected_ground;
  approvedCase['case_outcome'] = case_outcome;
  approvedCase['hearing_date'] = hearing_date;
  await db('cases').insert(approvedCase);
  await db('unapproved_cases').where({ primary_key: id }).del();
  console.log(await db('cases').where({ primary_key: id }));
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
