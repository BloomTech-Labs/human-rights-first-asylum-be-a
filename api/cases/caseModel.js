const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const findAll = async () => {
  const cases = await db('cases').select('id');
  let all_cases = [];
  for (let i = 0; i < cases.length; i++) {
    let one_case = await findById(cases[i].id);
    all_cases.push(one_case);
  }
  return all_cases;
};

const findById = async (id) => {
  const cases = await db('cases').where({ id }).first().select('*');
  const protected_ground = await db('protected_join')
    .where({ case_id: id })
    .select('protected_ground');
  const social_groups = await db('social_join')
    .where({ case_id: id })
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

const formData = async () => {
  const formData = {};
  const judge = await db('judges').select('name');
  const social = await db('social_tags').select('social_tag');
  const protected = await db('protected_tags').select('ground_tag');

  let judges = [];
  for (let i = 0; i < judge.length; i++) {
    let tag = Object.values(judge[i]);
    judge.push(word);
  }
  let socials = [];
  for (let i = 0; i < social.length; i++) {
    let tag = Object.values(social[i]);
    socials.push(word);
  }

  let protecteds = [];
  for (let i = 0; i < protected.length; i++) {
    let tag = Object.values(protected[i]);
    protecteds.push(word);
  }

  formData['judge_names'] = judges;
  formData['social_group_type'] = socials;
  formData['protected_ground'] = protecteds;

  return formData;
};

const writeCSV = async (id) => {
  // *  get only case data
  const case_data = await findById(id);

  // * create fields
  const case_fields = [];
  for (let field in case_data[0]) {
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
  formData,
  writeCSV,
};
