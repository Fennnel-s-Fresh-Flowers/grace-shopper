const router = require('express').Router()
const {isAdmin, isSelf, isSelfOrAdmin} = require('./routProtection')
const {User, Flower, Order, OrderFlower} = require('../db/models')
module.exports = router

// router.get('/', isAdmin, async (req, res, next) => {
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
    let orderObj = {}
    orderObj.total = flower.reduce(
      (accumulator, increment) => accumulator + +increment.totalPrice,
      0
    )
    orderObj.statusOpen = false
    if (req.session.passport && req.session.passport.user) {
      orderObj.userId = req.session.passport.user
    }
    const addedOrder = await Order.create(orderObj)
    console.log('req.session in order post: ', req.session)

    for (let i = 0; i < flower.length; i++) {
      let orderItem = flower[i]
      orderItem.orderId = addedOrder.id
      orderItem.pricePerUnit = orderItem.price
      const addedFlowerOrder = await OrderFlower.create(orderItem)
      const flowerQuantityUpdate = await Flower.update(
        {
          stock: orderItem.stock - orderItem.quantity
        },
        {
          where: {id: orderItem.flowerId},
          returning: true,
          plain: true
        }
      )
    }
    res.status(201).json()
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
