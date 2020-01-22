const router = require('express').Router()
const {isAdmin, isSelfOrAdmin} = require('./routProtection')
const {User, Flower, Order, OrderFlower} = require('../db/models')
module.exports = router

// router.get('/', isAdmin, async (req, res, next) => {
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.session.passport.user},
      include: [{model: Flower}, {model: User}]
    })
    console.log('in all orders get. returning: ', order)
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
  // USER PERSISTENT IN DB
  console.log('POOOOOSTING')
  try {
    const order = req.body
    let orderObj = {}
    orderObj.total = order.reduce(
      (accumulator, increment) => accumulator + +increment.totalPrice,
      0
    )
    orderObj.statusOpen = false
    if (req.session.passport && req.session.passport.user) {
      orderObj.userId = req.session.passport.user
      orderObj.statusOpen = true
    }
    const addedOrder = await Order.create(orderObj)
    console.log('req.session in order post: ', req.session)

    for (let i = 0; i < order.length; i++) {
      let orderItem = order[i]
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

// router.post('/', async (req, res, next) => { // USER NOT PERSISTENT IN DB
//   console.log('POOOOOSTING')
//   try {
//     const flower = req.body
//     let orderObj = {}
//     orderObj.total = flower.reduce(
//       (accumulator, increment) => accumulator + +increment.totalPrice,
//       0
//     )
//     orderObj.statusOpen = false
//     if (req.session.passport && req.session.passport.user) {
//       orderObj.userId = req.session.passport.user
//     }
//     const addedOrder = await Order.create(orderObj)
//     console.log('req.session in order post: ', req.session)

//     for (let i = 0; i < flower.length; i++) {
//       let orderItem = flower[i]
//       orderItem.orderId = addedOrder.id
//       orderItem.pricePerUnit = orderItem.price
//       const addedFlowerOrder = await OrderFlower.create(orderItem)
//       const flowerQuantityUpdate = await Flower.update(
//         {
//           stock: orderItem.stock - orderItem.quantity
//         },
//         {
//           where: {id: orderItem.flowerId},
//           returning: true,
//           plain: true
//         }
//       )
//     }
//     res.status(201).json()
//   } catch (error) {
//     next(error)
//   }
// })

// eslint-disable-next-line max-statements
router.put('/', async (req, res, next) => {
  //FOR USERS ONLY - UPDATE ORDER IN DB
  try {
    const order = req.body
    const orderInDB = await Order.findOne({
      where: {
        statusOpen: true,
        userId: req.session.passport.user
      }
    })
    if (!orderInDB) {
      let orderObj = {}
      orderObj.total = order.reduce(
        (accumulator, increment) => accumulator + +increment.totalPrice,
        0
      )
      if (req.session.checkout) {
        orderObj.statusOpen = false // UPDATE STOCK
      } else {
        orderObj.statusOpen = true
      }
      orderObj.userId = req.session.passport.user
      const addedOrder = await Order.create(orderObj)
      for (let i = 0; i < order.length; i++) {
        let orderItem = order[i]
        orderItem.orderId = addedOrder.id
        orderItem.pricePerUnit = orderItem.price
        const addedFlowerOrder = await OrderFlower.create(orderItem)
        if (req.session.checkout) {
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
      }
      res.status(201).json()
    } else {
      await orderInDB.update({
        total: order.reduce(
          (accumulator, increment) => accumulator + +increment.totalPrice,
          0
        )
      })
      if (req.session.checkout) {
        await orderInDB.update({
          statusOpen: false
        })
        // UPDATE STOCK
      }
      for (let i = 0; i < order.length; i++) {
        let orderItem = order[i]
        const orderFlowerFlowerIdInDB = await OrderFlower.findOne({
          where: {
            flowerId: orderItem.flowerId,
            orderId: orderInDB.id
          }
        })
        if (orderFlowerFlowerIdInDB) {
          await orderFlowerFlowerIdInDB.update({
            quantity: orderItem.quantity,
            pricePerUnit: orderItem.totalPrice
          })
        } else {
          orderItem.orderId = orderInDB.id
          orderItem.pricePerUnit = orderItem.price
          await OrderFlower.create(orderItem)
        }
        if (req.session.checkout) {
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
      }
    }
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
