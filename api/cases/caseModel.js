const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const findAll = async () => {
  return await db('cases');
};

const findById = async (id) => {
  return db('cases').where({ id }).first().select('*');
};

const findBy = async (filter) => {
  return db('cases').where(filter);
  // ? can this also be used to return the original PDF?
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

const writePDF = async (id) => {
  /* get full case data*/
  /* style pdf to display object data in a pleasing manner */
  /* return pdf */
};

module.exports = {
  add,
  findAll,
  findById,
  findBy,
  writeCSV,
  writePDF,
};
