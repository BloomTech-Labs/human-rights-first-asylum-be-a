const db = require('../../data/db-config');

const findAll = async () => {
  return await db('judges');
};

const findByName = async (name) => {
  const judge = await db('judges').where({ name }).first().select('*');
  const countries = await countryData(name);
  const cases = await caseData(name);

  judge['country_data'] = countries;
  judge['case_data'] = cases;
  return judge;
};

const caseData = async (judge_name) => {
  return db('cases').where({ judge_name }).select('*');
};

const countryData = async (judge_name) => {
  // search cases db by judge name & return refugee origin and decision
  return db('cases')
    .where({ judge_name })
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
        let country_data = [];
        for (var key in countryDict) {
          if (countryDict.hasOwnProperty(key)) {
            country_data.push([countryDict[key]]);
          }
          return Object.values(country_data[0]);
        }
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
