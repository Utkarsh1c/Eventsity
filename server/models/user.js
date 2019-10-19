//requiring sequelize and utility file
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//defining user schema
const samUser = sequelize.define('users', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
      },  
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    isLoggedIn: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

})

module.exports = samUser;