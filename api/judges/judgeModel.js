const db = require('../../data/db-config');
const cases = require('../cases/caseModel');
const { Parser } = require('json2csv');

const add = async (data) => {
  return db('judges').insert(data);
};

const findAllSimple = async () => {
  return await db('judges');
};

const findAll = async () => {
  const db_judges = await db('judges').select('first_name');

  let judges = [];
  for (let i = 0; i < db_judges.length; i++) {
    const judge = await findFullDataByName(Object.values(db_judges[i])[0]);
    judges.push(judge);
  }

  return judges;
};

const findByName = async (first_name) => {
  return await db('judges').where({ first_name });
};

const findById = async (judge_id) => {
  return await db('judges').where({ judge_id }).first();
};

const findJudgeCases = (judge_id) => {
  return db('cases as c')
    .join('judges as j', 'j.judge_id', 'c.judge_id')
    .select(`c.*`)
    .where('c.judge_id', judge_id);
};

// * This call takes awhile because of the sheer amount of datajoins
// * Would be great to streamline this in the future
const findFullDataByName = async (name) => {
  const judge = await findByName({ first_name: name });
  const countries = await countryData(name);
  const cases = await caseData(name);
  const secondary = await secondaryData(name);

  judge[0]['social_data'] = secondary[0];
  judge[0]['grounds_data'] = secondary[1];
  judge[0]['country_data'] = countries;
  judge[0]['case_data'] = cases;

  return judge[0];
};

const caseData = async (judge) => {
  return db('cases').where('judge_id', judge).select('*');
};

const countryData = async (judge) => {
  // * search cases db by judge name & return refugee origin and decision
  return db('cases')
    .where({ judge })
    .select('country_of_origin', 'outcome')
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
          if (
            !Object.prototype.hasOwnProperty.call(
              countryDict,
              countries[i].refugee_origin
            )
          ) {
            countryDict[countries[i].refugee_origin] = {
              country: countries[i].refugee_origin,
              count: 1,
              denial: 0,
              grant: 0,
              other: 0,
            };
            // ? should country data create the percentages here?
          } else {
            countryDict[countries[i].refugee_origin].count += 1;
          }
          // * once instantiated, check the judge's decision for denied vs grant
          // ! (in future release, check if there are other options)
          if (
            countries[i].refugee_origin.judge_decision == 'Denied' ||
            countries[i].refugee_origin.judge_decision == 'Not Approved'
          ) {
            countryDict[countries[i].refugee_origin].denial++;
          } else if (
            countries[i].refugee_origin.judge_decision == 'Granted' ||
            countries[i].refugee_origin.judge_decision == 'Approved'
          ) {
            countryDict[countries[i].refugee_origin].grant++;
          } else {
            countryDict[countries[i].refugee_origin].other++;
          }
        }
        // * change dictionary to list
        let country_data = [];
        for (var key in countryDict) {
          if (Object.prototype.hasOwnProperty.call(countryDict, key)) {
            country_data.push([countryDict[key]]);
          }
        }
        return Object.values(country_data[0]);
      }
    })
    .catch((err) => {
      return err;
    });
};

let grounds_data = [];
const secondaryData = async (judge) => {
  // * search cases db by judge name & return case_id
  const case_ids = await db('cases').where({ judge }).select('case_id');

  let socialDict = {};
  let groundsDict = {};

  let social_data = [];
  // * for every case, pull the social group type & protected ground
  for (let i = 0; i < case_ids.length; i++) {
    let one_case = await cases.findById(case_ids[i].id);
    let social_groups = one_case['social_group_type'];
    let protected_grounds = one_case['protected_ground'];
    let decision = one_case['judge_decision'];

    if (social_groups.length > 0) {
      for (let i = 0; i < social_groups.length; i++) {
        if (
          !Object.prototype.hasOwnProperty.call(socialDict, social_groups[i])
        ) {
          socialDict[social_groups[i]] = {
            social_group: social_groups[i],
            count: 1,
            denial: 0,
            grant: 0,
            other: 0,
          };
        } else {
          socialDict[social_groups[i]].count++;
        }
        if (decision == 'Granted' || decision == 'Approved') {
          socialDict.social_group.grant++;
        } else if (decision == 'Denied' || decision == 'Not Approved') {
          socialDict.social_group.denial++;
        } else {
          socialDict.social_group.other++;
        }
      }

      if (protected_grounds.length > 0) {
        for (let i = 0; i < protected_grounds.length; i++) {
          if (
            !Object.prototype.hasOwnProperty.call(
              groundsDict,
              protected_grounds[i]
            )
          ) {
            groundsDict[protected_grounds[i]] = {
              protected_ground: protected_grounds[i],
              count: 1,
              denial: 0,
              grant: 0,
              other: 0,
            };
          } else {
            groundsDict[protected_grounds[i]].count += 1;
          }
          if (decision == 'Granted' || decision == 'Approved') {
            groundsDict.protected_ground.grant += 1;
          } else if (decision == 'Denied' || decision == 'Not Approved') {
            groundsDict.protected_ground.denial += 1;
          } else {
            groundsDict.protected_ground.other += 1;
          }
        }
      }

      for (let key in socialDict) {
        if (Object.prototype.hasOwnProperty.call(socialDict, key)) {
          social_data.push([socialDict[key]]);
        }
        social_data = Object.values(social_data[0]);
      }

      for (let key in groundsDict) {
        if (Object.prototype.hasOwnProperty.call(groundsDict, key)) {
          const ground_data = [];
          ground_data.push([groundsDict[key]]);
        }
        grounds_data = Object.values(grounds_data[0]);
      }
    }
  }
  return [social_data, grounds_data];
};

const update = async (name, data) => {
  return db('judges').where({ first_name: name }).first().update(data);
};

const writeCSV = async (name) => {
  // * get judge data
  const judge_data = await findByName({ first_name: name });

  // * create fields
  const judge_fields = [];
  for (let field in judge_data[0]) {
    judge_fields.push(field);
  }
  const judge_opts = { fields: judge_fields };

  // * get country data
  const country_data = await countryData(name);
  const secondary_data = await secondaryData(name);

  // * create social fields
  const social_fields = [];

  for (let field in secondary_data[0][0]) {
    social_fields.push(field);
  }
  // * create ground fields
  const grounds_fields = [];
  for (let field in secondary_data[0][1]) {
    social_fields.push(field);
  }

  // * create country fields
  const country_fields = [];
  for (let field in country_data[0]) {
    country_fields.push(field);
  }

  // * create opts

  const grounds_opts = {
    fields: grounds_fields,
  };

  const social_opts = {
    fields: social_fields,
  };

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
    const social_parser = new Parser(social_opts);
    const grounds_parser = new Parser(grounds_opts);
    // * fill fields with data
    const judge_csv = judge_parser.parse(judge_data);
    const country_csv = country_parser.parse(country_data);
    const case_csv = case_parser.parse(case_data);
    const social_csv = social_parser.parse(secondary_data[0]);
    const grounds_csv = grounds_parser.parse(grounds_data[1]);

    // * return array of three variables with csv data
    return [judge_csv, country_csv, case_csv, social_csv, grounds_csv];
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  add,
  findAll,
  findByName,
  findAllSimple,
  findFullDataByName,
  update,
  writeCSV,
  findJudgeCases,
  findById,
};
