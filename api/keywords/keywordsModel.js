const db = require('../../data/db-config');

const addPos = async (data) => {
  return await db('postive_tags').insert(data);
};

const findAllPos = async () => {
  const tagsAll = await db('postive_tags');
  let tags = [];
  for (let i = 0; i < tagsAll.length; i++) {
    let tag = Object.values(tagsAll[i]);
    tags.push(tag[0]);
  }

  return tags;
};

// TODO find all keywords

const findByPosTag = async (positive_tag) => {
  return await db('postive_tags').where({ positive_tag });
};

const createPosJoin = async (judge_name, positive_tag) => {
  return await db('postive_join').insert({ judge_name, positive_tag });
};

module.exports = {
  addPos,
  findAllPos,
  findByPosTag,
  createPosJoin,
};
