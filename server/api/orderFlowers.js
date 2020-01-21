const router = require('express').Router()
const {isAdmin, isSelf, isSelfOrAdmin} = require('./routProtection')
const {User, Flower, Order, OrderFlower} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const orderFlower = req.body
    const addedorderFlower = await OrderFlower.create(orderFlower)
    res.status(201).json(addedorderFlower)
  } catch (error) {
    next(error)
  }
})
