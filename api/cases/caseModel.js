const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const FindById_DS_Case = async (uuid) => {
  return await db('ds_cases').where({ uuid });
};

const findAll = async () => {
  return await db('cases as c')
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name')
    .where({ status: 'approved' });
};

const findPending = async () => {
  return await db('cases as c')
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name')
    .whereNot({ status: 'approved' });
};

const findById = async (case_id) => {
  const cases = await db('cases as c')
    .where({ case_id })
    .first()
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
  return cases;
};

const findBy = async (filter) => {
  return db('cases')
    .where({ filter, status: 'approved' })
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
};

const findByUserId = (user_id) => {
  return db('cases as c')
    .where({ user_id })
    .where({ status: 'approved' })
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
};

const findPendingByUserId = (user_id) => {
  return db('cases as c').where({ user_id }).whereNot({ status: 'approved' });
  // .join('judges as j', 'j.judge_id', 'c.judge_id')
  // .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
  // This join is preventing cases from being returned accurately because we currently do not store judge_id when uploading a case.
  // judge_id is currently uploaded as a null value
};

const writeCSV = async (case_id) => {
  // *  get only case data
  const case_data = await findById(case_id);

  // * create fields
  const case_fields = [];
  for (let field in case_data) {
    case_fields.push(field);
  }
  const case_opts = { fields: case_fields };
  // * fill fields with case_data
  try {
    const case_parser = new Parser(case_opts);
    const case_csv = case_parser.parse(case_data);
    // * return variable with csv data

    return case_csv;
  } catch (err) {
    return err.message;
  }
};

const update = async (changes) => {
  changes.first_name ? delete changes.first_name : {};
  changes.middle_initial ? delete changes.middle_initial : {};
  changes.last_name ? delete changes.last_name : {};
  return await db('cases').where({ case_id: changes.case_id }).update(changes);
};

const remove = async (case_id) => {
  return await db('cases').where({ case_id }).del();
};

const changeStatus = async (id, newStatus) => {
  return await db('cases').where({ case_id: id }).update({ status: newStatus });
};

const casesByState = () => {
  return db('cases')
    .select(
      db.raw(
        "case_origin_state as state, count(*) as total, SUM(CASE WHEN outcome='Granted' THEN 1 ELSE 0 END) AS granted, SUM(CASE WHEN outcome='Denied' THEN 1 ELSE 0 END) AS denied, SUM(CASE WHEN outcome='Remanded' THEN 1 ELSE 0 END) AS remanded, SUM(CASE WHEN outcome='Terminated' THEN 1 ELSE 0 END) AS terminated, SUM(CASE WHEN outcome='Sustained' THEN 1 ELSE 0 END) AS sustained"
      )
    )
    .groupBy('case_origin_state');
};

module.exports = {
  add,
  remove,
  changeStatus,
  findAll,
  findPending,
  findById,
  findBy,
  writeCSV,
  update,
  findByUserId,
  findPendingByUserId,
  casesByState,
  FindById_DS_Case,
};
