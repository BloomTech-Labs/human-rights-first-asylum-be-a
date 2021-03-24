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
const findById = async (primary_key) => {
  const cases = await db('cases').where({ primary_key }).first().select('*');
  let protected_ground = await db('protected_join')
    .where({ case_id: primary_key })
    .select('protected_ground');
  let social_groups = await db('social_join')
    .where({ case_id: primary_key })
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

  cases['protected_ground'] = protected_ground;
  cases['social_group_type'] = social_groups;

  return cases;
};

const findBy = async (filter) => {
  return db('cases').where(filter);
};

const writeCSV = async (id) => {
  // *  get only case data
  const case_data = await findById(id);

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

module.exports = {
  add,
  findAll,
  findById,
  findBy,
  writeCSV,
};
