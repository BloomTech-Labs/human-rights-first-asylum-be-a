const db = require('../../data/db-config');

const add = async (data) => {
  return await db('protected_tags').insert(data);
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
  return await db('protected_tags').where({ ground_tag });
};

const createJoin = async (case_id, protected_ground) => {
  return await db('protected_join').insert({ case_id, protected_ground });
};

module.exports = {
  add,
  findAll,
  findByTag,
  createJoin,
};
