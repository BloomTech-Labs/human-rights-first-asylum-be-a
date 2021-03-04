const db = require('../../data/db-config');
// const { Parser } = require('json2csv');
const approve = async (data) => {
  return await db('approved-cases').insert(data);
};

const reject = async (data) => {
  return await db('approved-cases').delete(data);
};

const findAllApproved = async () => {
  return await db('approved-cases');
  // let all_cases = [];
  // for (let i = 0; i < cases.length; i++) {
  //   let one_case = findById(cases[i].id);
  //   all_cases.push(one_case);
  // }
  // return all_cases;
};

module.exports = {
  approve,
  reject,
  findAllApproved,
};
