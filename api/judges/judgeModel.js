const db = require('../../data/db-config');
const cases = require('../cases/caseModel');

const findAll = async () => {
  return await db('judges');
};

const findByName = async (name) => {
  return db('judges').where({ name }).first().select('*');
};

const caseData = async (judge_name) => {
  return db('judges as j')
    .where({ judge_name })
    .join('cases as c', 'c.judge_name', 'j.name')
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

const countryData = async (name) => {
  // search cases db by judge name & return refugee origin and decision
  return db('cases')
    .where({ judge_name: name })
    .select('refugee_origin', 'judge_decision')
    .then((countries) => {
      // if there are any countries, create a dictionary of dictionaries
      if (countries.length > 0) {
        let countryDict = {};
        for (let i = 0; i < countries.length; i++) {
          //store countries in array
          //for each refugee in list, value += 1
          //if denied = denial ++
          //if the country doesn't exist in the dictionary, instantiate
          if (!countryDict.hasOwnProperty(countries[i].refugee_origin)) {
            console.log('Sent');
            countryDict[countries[i].refugee_origin] = {
              country: countries[i].refugee_origin,
              count: 1,
              denial: 0,
            };
          } else {
            countryDict[countries[i].refugee_origin].denial += 1;
          }
          // once instantiated, check the judge's decision for denied vs grant (in future release, check if there are other options)
          if (countries[i].refugee_origin.judge_decision == 'Denied') {
            countryDict.refugee_origin.denial++;
          }
        }
        return countryDict;
      }
    })
    .catch();
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
