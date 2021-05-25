const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const findAll = async () => {
  return await db('cases as c')
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
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
    .where(filter)
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name');
};
const findByUserId = (user_id) => {
  return db('cases').where({ user_id });
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
  return await db('cases').where({ case_id }).update(changes);
};

const casesByState = () => {
  return db('cases')
    .select(db.raw('count(*) as count, case_origin_state as state'))
    .groupBy('case_origin_state');
};

module.exports = {
  add,
  findAll,
  findById,
  findBy,
  writeCSV,
  update,
  findByUserId,
  casesByState,
};
