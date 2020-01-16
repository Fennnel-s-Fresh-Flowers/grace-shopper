const router = require('express').Router()
const {Flower} = require('../db/models')
const {isAdmin, isSelf, isSelfOrAdmin} = require('./routProtection')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const flowers = await Flower.findAll()
    res.json(flowers)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const flower = await Flower.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(flower)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const inputs = req.body
    const newFlower = await Flower.create(inputs)
    res.status(201).json(newFlower)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const flower = await Flower.findByPk(+req.params.id)
    if (!flower) return res.status(404).json('invalid Item')
    await flower.update(req.body)
    res.status(200).json(flower)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Flower.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
