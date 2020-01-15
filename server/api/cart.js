const router = require('express').Router()
const {User, Flower, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      include: [{model: Flower}, {model: User}]
    })
    res.json(carts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const cart = await Cart.findByPk(id, {
      include: [{model: Flower}, {model: User}]
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const flower = req.body
    const addedFlower = await Cart.create(flower)
    res.status(201).json(addedFlower)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const cartFlower = await Cart.findByPk(req.params.id)
    await cartFlower.update(req.body)
    res.status(200).json(cartFlower)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
