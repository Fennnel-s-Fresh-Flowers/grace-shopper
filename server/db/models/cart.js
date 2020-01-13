const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  item: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart
