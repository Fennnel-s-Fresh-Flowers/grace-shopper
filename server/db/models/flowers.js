const Sequelize = require('sequelize')
const db = require('../db')

const Flower = db.define('flower', {
  name: {
    type: Sequelize.STRING
  },
  stock: {type: Sequelize.INTEGER},
  imgUrl: {type: Sequelize.STRING}
})

module.exports = Flower
