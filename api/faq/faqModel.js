const db = require('../../data/db-config');

const findAll = async () => {
  return await db('faq');
};

const findById = async (id) => {
  const question = await db('faq').where({ id }).first().select('*');
  return question;
};

const create = async (faq) => {
  return db('faq').insert(faq).returning('*');
};

const update = (id, faq) => {
  return db('faq').where({ id: id }).first().update(faq).returning('*');
};

const remove = async (id) => {
  return await db('faq').where({ id }).del();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
