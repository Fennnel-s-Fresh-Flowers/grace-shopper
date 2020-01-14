const Sequelize = require('sequelize')
const db = require('../db')

const Flower = db.define('flower', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }, //lets be sure to make the price a quantity in pennies because JS is bad at math
  stock: {type: Sequelize.INTEGER},
  imgUrl: {type: Sequelize.STRING}
})

module.exports = Flower
