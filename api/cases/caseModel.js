const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const FindById_DS_Case = async (uuid) => {
  return await db('ds_cases').where({ uuid }).first();
};

const getAllDs_case = () => {
  return db('ds_cases');
};

const findUrlByUUID = async (case_id) => {
  const data = await db('cases')
    .where({ case_id })
    .update({ status: 'pending' }, 'url');
  return data[0]?.url;
};

const findJudgeByFullName = (first_name, middle_initial, last_name) => {
  return db('judges')
    .where({ first_name }, { middle_initial }, { last_name })
    .first();
};

const makeAnewJudge = (first_name, middle_initial, last_name) => {
  return db('judges').insert({ first_name, middle_initial, last_name }, [
    'judge_id',
  ]);
};

const updateCaseOnceSraped = async (case_id, data) => {
  return await db('cases').where({ case_id }).update(data, ['*']);
};

const assignJudgesToCase = async (case_id, judge_id) => {
  return await db('judges_to_case').insert({ case_id, judge_id }, ['*']);
};

const updateCaseStatusTest = (case_id) => {
  return db('cases').where({ case_id }).update({ status: 'Pending' });
};

const findAll = () => {
  const cases = db('cases as c')
    .where({ status: 'Approved' })
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
  return cases;
};

const findPending = () => {
  return db('cases').where({ status: 'Pending' });
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

const findCasesByUser_id = (user_id) => {
  return db('cases').where({ user_id });
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

const update = async (case_id, changes) => {
  return await db('cases').where({ case_id }).update(changes, ['*']);
};

const remove = async (case_id) => {
  return await db('cases').where({ case_id }).del();
};

const changeStatus = async (case_id, newStatus) => {
  return await db('cases').where({ case_id }).update({ status: newStatus });
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

const caseOutcome = () => {
  return db('cases as c').select('c.outcome', 'c.case_origin_state');
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
  findCasesByUser_id,
  casesByState,
  FindById_DS_Case,
  updateCaseOnceSraped,
  getAllDs_case,
  findJudgeByFullName,
  makeAnewJudge,
  findUrlByUUID,
  assignJudgesToCase,
  caseOutcome,
  updateCaseStatusTest,
};
