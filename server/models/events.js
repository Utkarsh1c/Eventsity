//requiring sequelize and utility file
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//defining events schema
const fevents = sequelize.define('events', {
    
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ename: {
        type: Sequelize.STRING,
        allowNull: false
      },
    imagePath: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    evenue: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fevenue: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orgname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registrations: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = fevents;