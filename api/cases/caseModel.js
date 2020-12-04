const db = require('../../data/db-config');

const findAll = async () => {
  return await db('cases');
};

const findById = async (id) => {
  return db('cases').where({ id }).first().select('*');
};

const findBy = async (filter) => {
  return db('cases').where(filter);
};

const writeCSV = async (id) => {
  /* get only case data*/
  /* write to a csv and return */
};

const writePDF = async (id) => {
  /* return stored PDF */
};
const createPDF = async (id) => {
  /*get full case data
  style pdf in a pleasing manner
  return PDF */
};

module.exports = {
  findAll,
  findById,
  findBy,
  writeCSV,
  writePDF,
};
