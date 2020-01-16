const router = require('express').Router()
const {User, Flower, Order, OrderFlower} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      include: [{model: Flower}, {model: User}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const order = await Order.findByPk(id, {
      include: [{model: Flower}, {model: User}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const flower = req.body
    const addedFlower = await Order.create(flower)
    res.status(201).json(addedFlower)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const orderFlower = await Order.findByPk(req.params.id)
    await orderFlower.update(req.body)
    res.status(200).json(orderFlower)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
