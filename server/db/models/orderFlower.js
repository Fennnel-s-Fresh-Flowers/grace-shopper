const Sequelize = require('sequelize')
const db = require('../db')

const OrderFlower = db.define('orderFlower', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  pricePerUnit: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderFlower
