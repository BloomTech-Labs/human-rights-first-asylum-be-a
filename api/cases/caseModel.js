const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const findAll = async () => {
  return await db('cases as c')
    .join('judges as j', 'j.judge_id', 'c.judge')
    .select('c.*', 'j.name as judge_name');
};

// * This function takes a moment because of the data attached
// Update this with case_id instead of case_number once it's all working
const findById = async (case_number) => {
  const cases = await db('cases as c')
    .where({ case_number })
    .first()
    .join('judges as j', 'j.judge_id', 'c.judge')
    .select('c.*', 'j.name as judge_name');
  let protected_ground = await db('protected_join')
    .where({ case_id: case_number })
    .select('protected_ground');
  let social_groups = await db('social_join')
    .where({ case_id: case_number })
    .select('social_group');

  if (protected_ground.length > 0) {
    let tags = [];
    for (let i = 0; i < protected_ground.length; i++) {
      const tag = Object.values(protected_ground[i]);
      tags.push(tag);
    }
    protected_ground = tags;
  }

  if (social_groups.length > 0) {
    let tags = [];
    for (let i = 0; i < social_groups.length; i++) {
      const tag = Object.values(social_groups[i]);
      tags.push(tag);
    }
    social_groups = tags;
  }

  cases['protected_ground_join'] = protected_ground;
  cases['social_group_type'] = social_groups;

  return cases;
};

const findBy = async (filter) => {
  return db('cases')
    .where(filter)
    .join('judges as j', 'j.judge_id', 'c.judge')
    .select('c.*', 'j.name as judge_name');
};

const writeCSV = async (case_number) => {
  // *  get only case data
  const case_data = await findById(case_number);

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

const update = async (case_number, changes) => {
  return await db('cases').where({ case_number }).update(changes);
};

module.exports = {
  add,
  findAll,
  findById,
  findBy,
  writeCSV,
  update,
};
