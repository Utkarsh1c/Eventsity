//requiring sequelize
const Sequelize = require('sequelize');

//utility database file for all models
const sequelize = new Sequelize('node_complete', 'root', 'sequel568', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
