//requiring sequelize
const Sequelize = require('sequelize');

//utility database file for all models
const sequelize = new Sequelize('node-complete', 'root', '1234', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
