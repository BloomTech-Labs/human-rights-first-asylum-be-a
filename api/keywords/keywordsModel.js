const db = require('../../data/db-config');

const addPos = async (data) => {
  return await db('positive_tags').insert(data);
};

const addNeg = async (data) => {
  return await db('negative_tags').insert(data);
};

const findAllPos = async () => {
  const tagsAll = await db('positive_tags');
  let tags = [];
  for (let i = 0; i < tagsAll.length; i++) {
    let tag = Object.values(tagsAll[i]);
    tags.push(tag[0]);
  }

  return tags;
};

const findAllNeg = async () => {
  const tagsAll = await db('negative_tags');
  let tags = [];
  for (let i = 0; i < tagsAll.length; i++) {
    let tag = Object.values(tagsAll[i]);
    tags.push(tag[0]);
  }

  return tags;
};

// TODO find all keywords

const findAll = async () => {
  const negative_keywords = await findAllNeg();
  const positive_keywords = await findAllPos();
  const keywords = {};

  keywords['negative_keywords'] = negative_keywords;
  keywords['positve_keywords'] = positive_keywords;

  return keywords;
};

const findByPosTag = async (positive_tag) => {
  return await db('positive_tags').where({ positive_tag });
};

const findByNegTag = async (negative_tag) => {
  return await db('negative_tags').where({ negative_tag });
};

const createPosJoin = async (judge_name, positive_tag) => {
  return await db('positive_join').insert({ judge_name, positive_tag });
};

const createNegJoin = async (judge_name, negative_tag) => {
  return await db('negative_join').insert({ judge_name, negative_tag });
};

module.exports = {
  addPos,
  addNeg,
  findAllPos,
  findAllNeg,
  findAll,
  findByPosTag,
  findByNegTag,
  createPosJoin,
  createNegJoin,
};
