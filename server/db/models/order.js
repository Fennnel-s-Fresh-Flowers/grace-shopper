const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
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
  }
})

module.exports = Order
