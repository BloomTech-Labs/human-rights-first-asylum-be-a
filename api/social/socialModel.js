const db = require('../../data/db-config');

const add = async (data) => {
  return await db('social_tags').insert(data);
};

const findAll = async () => {
  const tagsAll = await db('social_tags');
  let tags = [];
  for (let i = 0; i < tagsAll.length; i++) {
    let tag = Object.values(tagsAll[i]);
    tags.push(tag[0]);
  }

  return tags;
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
