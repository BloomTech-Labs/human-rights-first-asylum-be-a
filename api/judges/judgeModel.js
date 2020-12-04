const db = require('../../data/db-config');
const cases = require('../cases/caseModel');

const findAll = async () => {
  return await db('judges');
};

const findByName = async (name) => {
  return db('judges').where({ name }).first().select('*');
};

const caseData = async (judge_name) => {
  return db('cases as c')
    .where({ judge_name })
    .join('judges as j', 'j.name', 'c.judge_name')
    .select('*')
    .then((cases) => {
      if (cases.length > 0) {
        const resultMap = cases.reduce((result, row) => {
          result[row.name] = result[row.name] || {
            ...row,
            cases: [],
          };
          result[row.name].cases.push({
            id: row.id,
            case_status: row.case_status,
            case_url: row.case_url,
            court_type: row.court_type,
            credibility_of_refugee: row.credibility_of_refugee,
            hearing_date: row.hearing_date,
            hearing_location: row.hearing_location,
            hearing_type: row.hearing_type,
            decision_date: row.decision_date,
            protected_ground: row.protected_ground,
            social_group_type: row.social_group_type,
            judge_decision: row.judge_decision,
            refugee_origin: row.refugee_origin,
          });
          return result;
        }, {});
        return Object.values(resultMap)[0];
      } else {
        return db('judges').where({ name }).first().select('*');
      }
    });
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
  caseData,
  countryData,
  writeCSV,
  writePDF,
};
