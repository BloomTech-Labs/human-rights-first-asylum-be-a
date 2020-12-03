const db = require('../../data/db-config');

const findAll = async () => {
  return await db('cases');
};

const findById = async (id) => {
  return db('cases').where({ id }).first().select('*');
};

const findBy = async (filter) => {
  return db('cases').where(filter);
  //can this also be used to return the original PDF?
};

const writeCSV = async (id) => {
  /* get only case data*/
  /* write to a csv and return */
};

const writePDF = async (id) => {
  /* get full case data*/
  /* style pdf to display object data in a pleasing manner */
  /* return pdf */
};

module.exports = {
  findAll,
  findById,
  findBy,
  writeCSV,
  writePDF,
};
