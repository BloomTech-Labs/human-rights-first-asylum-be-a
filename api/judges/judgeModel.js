const db = require('../../data/db-config');
const cases = require('../cases/caseModel');

const findAll = async () => {
  return await db('judges');
};

const findByName = async (name) => {
  console.log(name);
  return db('judges').where({ judge_name: name }).first().select('*');
};

const caseData = async (judge_name) => {
  /* find judge by judge_name */
  //await const judge = findByName(judge_name)
  /* search cases by judge_name */
  // cases.findBy(judge_name)
  /* add array of case objects */
};

const countryData = async (judge_name) => {
  /*find judge by judge_name */
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

const writeCSV = async (judge_name) => {
  /* get only judge data, no cases */
  /* write to a csv and return */
};

const writePDF = async (judge_name) => {
  /* get full judge data, including countries */
  /* style pdf to display object data in a pleasing manner */
  /* return pdf */
};

module.exports = {
  findAll,
  findByName,
  countryData,
  writeCSV,
  writePDF,
};
