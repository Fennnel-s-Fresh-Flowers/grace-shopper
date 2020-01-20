const router = require('express').Router()
const {isAdmin, isSelf, isSelfOrAdmin} = require('./routProtection')
const {User, Flower, Order} = require('../db/models')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
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

router.post('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  const cart = req.session.cart
  // console.log('body name: ', req.body[0].name)
  // console.log('cart: ', cart)
  // console.log('includes', cart[0].name === req.body[0].name)
  for (let i = 0; i <= cart.length; i++) {
    // console.log('the names: ', cart[i].name)
    if (i === cart.length) {
      cart[i] = req.body[0]
      break
    }
    if (cart[i].name === req.body[0].name && i < cart.length) {
      // console.log('in the cart for loop if statement')
      cart[i].quantity += req.body[0].quantity
      break
    }
  }
  console.log('cart after loop: ', cart)
  res.json(cart)
})

// router.post('/', async (req, res, next) => {
//   try {
//     const flower = req.body
//     const addedFlower = await Order.create(flower)
//     res.status(201).json(addedFlower)
//   } catch (error) {
//     next(error)
//   }
// })

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
