const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return db('judges').insert(data);
};

const findAll = async () => {
  return await db('judges');
};

const findByName = async (name) => {
  return await db('judges').where({ name });
};

const findFullDataByName = async (name) => {
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
  // * search cases db by judge name & return refugee origin and decision
  return db('cases')
    .where({ judge_name })
    .select('refugee_origin', 'judge_decision')
    .then((countries) => {
      // * if there are any countries, create a dictionary of dictionaries
      if (countries.length > 0) {
        let countryDict = {};
        for (let i = 0; i < countries.length; i++) {
          // * store countries in array
          // * for each refugee in list, value += 1
          // * if denied = denial ++
          // * if the country doesn't exist in the dictionary, instantiate
          // ? how to filter the approval/denial? Are there other possible options?
          if (!countryDict.hasOwnProperty(countries[i].refugee_origin)) {
            countryDict[countries[i].refugee_origin] = {
              country: countries[i].refugee_origin,
              count: 1,
              denial: 0,
            };
            // ? should country data create the percentages here?
          } else {
            countryDict[countries[i].refugee_origin].count += 1;
          }
          // * once instantiated, check the judge's decision for denied vs grant
          // ! (in future release, check if there are other options)
          if (countries[i].refugee_origin.judge_decision == 'Denied') {
            countryDict.refugee_origin.denial++;
          }
        }
        // * change dictionary to list
        let country_data = [];
        for (var key in countryDict) {
          if (countryDict.hasOwnProperty(key)) {
            country_data.push([countryDict[key]]);
          }
          return Object.values(country_data[0]);
        }
      }
    })
    .catch((err) => {
      return err;
    });
};
const update = async (name, data) => {
  return db('judges').where({ name }).first().update(data);
};
const writeCSV = async (name) => {
  // * get judge data
  const judge_data = await findByName(name);

  // * create fields
  const judge_fields = [];
  for (let field in judge_data[0]) {
    judge_fields.push(field);
  }
  const judge_opts = { fields: judge_fields };

  // * get country data
  const country_data = await countryData(name);

  // * create country fields
  const country_fields = [];
  for (let field in country_data[0]) {
    country_fields.push(field);
  }
  const country_opts = {
    fields: country_fields,
  };

  // * get case data
  const case_data = await caseData(name);

  // * create case fields
  const case_fields = [];
  for (let field in case_data[0]) {
    case_fields.push(field);
  }
  const case_opts = { fields: case_fields };

  try {
    // * create fields in csv
    const judge_parser = new Parser(judge_opts);
    const country_parser = new Parser(country_opts);
    const case_parser = new Parser(case_opts);
    // * fill fields with data
    const judge_csv = judge_parser.parse(judge_data);
    const country_csv = country_parser.parse(country_data);
    const case_csv = case_parser.parse(case_data);

    // * return array of three variables with csv data
    return [judge_csv, country_csv, case_csv];
  } catch (err) {
    return err.message;
  }
};

const writePDF = async (judge_name) => {
  /* get full judge data, including countries */
  /* style pdf to display object data in a pleasing manner */
  // pdf styler in alternate component
};

module.exports = {
  add,
  findAll,
  findByName,
  findFullDataByName,
  update,
  writeCSV,
  writePDF,
};
