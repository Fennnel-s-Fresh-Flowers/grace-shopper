const router = require('express').Router()
const {isAdmin, isSelf, isSelfOrAdmin} = require('./routProtection')
const {User, Flower, Order, OrderFlower} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await req.session.cart
    // console.log('HEEEEEEERE', req.session)
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
  req.session.checkout = false
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
      cart[i].totalPrice += req.body[0].totalPrice
      break
    }
  }
  console.log('cart after loop: ', req.session)
  res.json(cart)
})

router.post('/checkout', (req, res, next) => {
  req.session.checkout = true
  res.json(req.session.checkout)
})

router.put('/', (req, res, next) => {
  req.session.cart = req.body
  console.log('in put request: ', req.session)
  res.json(req.session.cart)
})

router.delete('/', (req, res, next) => {
  req.session.cart = []
  console.log('in put request: ', req.session)
  res.json(req.session.cart)
})
