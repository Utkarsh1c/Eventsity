const Sequelize = require('sequelize');
const sequelize = require('../util/database');

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
    isOrganiser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

})

module.exports = samUser;