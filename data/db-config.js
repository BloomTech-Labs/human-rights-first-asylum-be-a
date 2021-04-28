const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const knex = require('knex');
const env = process.env.NODE_ENV || 'development';
const knexConfig = require('../config/knexfile');
module.exports = knex(knexConfig[env]);
