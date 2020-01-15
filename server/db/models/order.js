const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  statusOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  dateOfPurchase: {
    type: Sequelize.DATE,
    allowNull: true
  }
})

module.exports = Order
