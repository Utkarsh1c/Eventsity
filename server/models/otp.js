const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const samOtp = sequelize.define('otps', {

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

module.exports = samOtp;