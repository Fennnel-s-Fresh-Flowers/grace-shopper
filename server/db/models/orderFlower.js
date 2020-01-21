const Sequelize = require('sequelize')
const db = require('../db')
const Flower = require('./flower')
const Order = require('./order')

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
  // orderId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: Order,
  //     key: 'id'
  //   }
  // },
  // flowerId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: Flower,
  //     key: 'id'
  //   }
  // }
})

module.exports = OrderFlower
