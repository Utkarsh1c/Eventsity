const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const samtable = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    creator: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = samtable;