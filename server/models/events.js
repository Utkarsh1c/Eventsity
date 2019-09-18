const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const fevents = sequelize.define('events', {
    
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    ename: {
        type: Sequelize.STRING,
        allowNull: false
      },
    imagePath: {
        type: Sequelize.STRING,
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
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = fevents;