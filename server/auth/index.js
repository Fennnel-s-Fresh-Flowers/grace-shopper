const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.use('/google', require('./google'))

router.post('/login', async (req, res, next) => {
  try {
    console.log('IN LOGIN ROUTE', req.body)
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      res.status(401).send('No such user')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {

//   } catch (error) {
//     next(error)
//   }
// })

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})
