const router = require('express').Router()
const {Flower} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const flowers = Flower.findAll()
    res.json(flowers)
  } catch (error) {
    next(error)
  }
})

router.post('/campuses', async (req, res, next) => {
  try {
    const inputs = req.body
    const newFlower = await Flower.create(inputs)
    res.json(newFlower)
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
    const targetId = req.params.id
    const targetFlower = await Flower.findOne({
      where: {
        id: targetId
      }
    })

    if (targetFlower) {
      await targetFlower.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
