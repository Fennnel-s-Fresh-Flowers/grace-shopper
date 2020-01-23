const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await req.session.cart
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
  for (let i = 0; i <= cart.length; i++) {
    if (i === cart.length) {
      cart[i] = req.body[0]
      break
    }
    if (cart[i].name === req.body[0].name && i < cart.length) {
      cart[i].quantity += req.body[0].quantity
      cart[i].totalPrice += req.body[0].totalPrice
      break
    }
  }
  res.json(cart)
})

router.post('/checkout', (req, res, next) => {
  req.session.checkout = true
  res.json(req.session.checkout)
})

router.put('/', (req, res, next) => {
  req.session.cart = req.body
  res.json(req.session.cart)
})

router.delete('/', (req, res, next) => {
  req.session.cart = []
  res.json(req.session.cart)
})
