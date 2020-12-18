const db = require('../../data/db-config');

const addProt = async (data) => {
  return await db('protected_tags').insert(data);
};

const findAllProt = async () => {
  const tagsAll = await db('social_tags');
  let tags = [];
  for (let i = 0; i < tagsAll.length; i++) {
    let tag = Object.values(tagsAll[i]);
    tags.push(tag[0]);
  }

  return tags;
};

const findByTagProt = async (ground_tag) => {
  return await db('protected_tags').where({ ground_tag });
};

const createJoinProt = async (case_id, protected_ground) => {
  return await db('protected_join').insert({ case_id, protected_ground });
};

const addSoc = async (data) => {
  return await db('social_tags').insert(data);
};

const findAllSoc = async () => {
  const tagsAll = await db('social_tags');
  let tags = [];
  for (let i = 0; i < tagsAll.length; i++) {
    let tag = Object.values(tagsAll[i]);
    tags.push(tag[0]);
  }

  return tags;
};

const findByTagSoc = async (social_tag) => {
  return await db('social_tags').where({ social_tag });
};

const createJoinSoc = async (case_id, social_group) => {
  return await db('social_join').insert({ case_id, social_group });
};
module.exports = {
  addProt,
  addSoc,
  findAllProt,
  findAllSoc,
  findByTagProt,
  findByTagSoc,
  createJoinProt,
  createJoinSoc,
};
