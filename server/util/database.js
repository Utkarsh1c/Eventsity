const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'sqll', {
    dialect: 'mysql',
    host: 'localhost'
});