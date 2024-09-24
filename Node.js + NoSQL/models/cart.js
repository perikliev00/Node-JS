const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Cart = sequelize.define('cart', {
  id: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;