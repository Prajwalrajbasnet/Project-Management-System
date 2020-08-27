require('dotenv').config({ path: __dirname + '/../.env' });

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
