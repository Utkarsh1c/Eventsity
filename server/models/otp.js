const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const samUser = sequelize.define('otps', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: false,
    }

})

module.exports = samUser;