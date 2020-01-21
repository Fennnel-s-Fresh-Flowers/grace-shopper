const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/flowers', require('./flowers'))
router.use('/orders', require('./orders'))
router.use('/session', require('./session'))
router.use('/orderFlowers', require('./orderFlowers'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
