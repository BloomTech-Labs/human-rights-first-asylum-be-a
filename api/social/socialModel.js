const db = require('../../data/db-config');

const add = async (data) => {
  return await db('social_tags').insert(data);
};

const findAll = async () => {
  return await db('social_tags');
};

const findByTag = async (ground_tag) => {
  return await db('social_tags').where({ ground_tag });
};

const createJoin = async (case_id, group) => {
  return await db('social_join').insert({ case_id, group });
};

module.exports = {
  add,
  findAll,
  findByTag,
  createJoin,
};
