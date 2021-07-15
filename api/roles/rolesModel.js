const db = require('../../data/db-config');

const getAll = () => {
  return db('roles');
};

const getRoleById = (role_id) => {
  return db('roles').where({ role_id }).first();
};

const getRoleByName = (role_name) => {
  return db('roles').where({ role_name }).first();
};

const update = async (role_id, role) => {
  await db('roles').where({ role_id }).first().update(role);
  return getRoleById(role_id);
};

module.exports = {
  getAll,
  getRoleById,
  getRoleByName,
  update,
};
