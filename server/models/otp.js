const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const samUser = sequelize.define('otp', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  otp: {
    type: Sequelize.STRING,
    defaultValue: null
    }

})

module.exports = samUser;