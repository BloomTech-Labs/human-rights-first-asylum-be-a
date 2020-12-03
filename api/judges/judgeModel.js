const db = require('../../data/db-config');
const cases = require('../cases/caseModel');

const findAll = async () => {
  return await db('judges');
};

const findById = async (id) => {
  return db('judges').where({ id }).first().select('*');
};

const caseData = async (id) => {
  /* find judge by id */
  /* search cases by judge_name */
  // cases.findBy(judge_name)
  /* add array of case objects */
};

const countryData = async (id) => {
  /*find judge by id */
  /* create an object for each country */
  /* from cases with judge name, select country & decision*/
  /* {
         country_name = name
         approval_rate = # of times country / # of grants * 100 + %
         denial_rate = 100 - approval_rate %
     }
     /*add each object to a countries list*/
  /* return judge data */
};

const writeCSV = async (id) => {
  /* get only judge data, no cases */
  /* write to a csv and return */
};

const writePDF = async (id) => {
  /* get full judge data, including countries */
  /* style pdf to display object data in a pleasing manner */
  /* return pdf */
};

module.exports = {
  findAll,
  countryData,
  writeCSV,
  writePDF,
};
