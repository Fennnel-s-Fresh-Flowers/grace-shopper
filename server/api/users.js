const router = require('express').Router()
const {isAdmin, isSelf, isSelfOrAdmin} = require('./routProtection')
const {User} = require('../db/models')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('in user post. req.body: ', req.body)
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('in the user router put. req.body: ', req.body)
    const user = await User.findByPk(+req.params.id)
    if (!user) return res.status(404).json('No such user at our store!')
    const updatedUser = await User.update(req.body, {
      where: {id: req.params.id},
      returning: true,
      plain: true
    })
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
