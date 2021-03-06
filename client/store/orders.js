import axios from 'axios'

//ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_ONE_ORDER = 'GOT_ONE_ORDER'
const ADDED_ORDER_TO_STORE = 'ADDED_ORDER_TO_STORE'
const GOT_ORDER_FROM_SESSION = 'GOT_ORDER_FROM_SESSION'
const ADDED_ORDER_TO_SESSION = 'ADD_ORDER_TO_SESSION'
const UPDATED_ORDER_IN_SESSION = 'UPDATED_ORDER_IN_SESSION'
const CLEAR_CART = 'CLEAR_CART'

//ACTION CREATORS
const gotAllOrders = orders => ({type: GOT_ALL_ORDERS, orders})
const gotOneOrder = order => ({type: GOT_ONE_ORDER, order})
const gotOrderFromSession = order => ({type: GOT_ORDER_FROM_SESSION, order})
const addedOrderToSession = order => ({type: ADDED_ORDER_TO_SESSION, order})
const updatedOrderInSession = order => ({type: UPDATED_ORDER_IN_SESSION, order})
const addedOrderToStore = order => ({type: ADDED_ORDER_TO_STORE, order})

export const clearCart = empty => ({type: CLEAR_CART, empty})

export const checkoutForGuest = order => {
  return async dispatch => {
    const {data} = await axios.post(`/api/orders/`, order)
    dispatch(addedOrderToStore(data))
  }
}

export const checkoutForUser = order => {
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/userCheckout`, order)
    dispatch(addedOrderToStore(data))
  }
}

export const getAnOrder = function(id) {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOneOrder(data))
  }
}

export const sendOrderToDb = function(order) {
  return async () => {
    await axios.put('/api/orders', order)
  }
}

export const addOrderToSessionForGuest = function(orderItem) {
  const sentItem = []
  sentItem.push(orderItem)
  return async dispatch => {
    const {data} = await axios.post(`/api/session/`, sentItem)

    dispatch(addedOrderToSession(data))
  }
}

export const addOrderToSessionForUser = function(orderItem) {
  const sentItem = []
  sentItem.push(orderItem)
  return async dispatch => {
    const {data} = await axios.post(`/api/session/`, sentItem)
    dispatch(addedOrderToSession(data))
    dispatch(sendOrderToDb(data))
  }
}

export const updateOrderToSessionForGuest = function(order) {
  return async dispatch => {
    const {data} = await axios.put(`/api/session/`, order)
    dispatch(updatedOrderInSession(data))
  }
}

export const updateOrderToSessionForUser = function(order) {
  return async dispatch => {
    const {data} = await axios.put(`/api/session/`, order)
    dispatch(updatedOrderInSession(data))
    dispatch(sendOrderToDb(data))
  }
}

export const getOrderFromSession = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/session')
    dispatch(gotOrderFromSession(data))
  }
}

export const getAllOrders = function() {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders`)
    dispatch(gotAllOrders(data))
  }
}

export const clearSession = function() {
  return async dispatch => {
    await axios.delete('/api/session/')
    dispatch(clearCart([]))
  }
}

export const setOpenCartOnSession = function() {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/userCart`)
    if (data && data.id) {
      let orderArr = []
      let flowerArr = data.flowers
      flowerArr.forEach(flowerOrder => {
        let orderItem = {}
        orderItem.name = flowerOrder.name
        orderItem.price = flowerOrder.price
        orderItem.quantity = flowerOrder.orderFlower.quantity
        orderItem.totalPrice =
          parseInt(flowerOrder.orderFlower.quantity) *
          parseInt(flowerOrder.price)
        orderItem.stock = flowerOrder.stock
        orderItem.flowerId = flowerOrder.id
        orderArr.push(orderItem)
      })

      await axios.put('/api/session', orderArr)

      dispatch(addedOrderToSession(orderArr))
    } else {
      dispatch(getOrderFromSession())
    }
  }
}

export default function orderReducer(
  orders = {all: [], session: [], single: {}},
  action
) {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return {...orders, all: action.orders}
    case GOT_ONE_ORDER:
      return {...orders, single: action.order}
    case ADDED_ORDER_TO_STORE:
      return {...orders, all: action.order}
    case ADDED_ORDER_TO_SESSION:
      return {...orders, session: action.order}
    case GOT_ORDER_FROM_SESSION:
      return {...orders, session: action.order}
    case UPDATED_ORDER_IN_SESSION:
      return {...orders, session: action.order}
    case CLEAR_CART:
      return {...orders, session: action.empty}
    default:
      return orders
  }
}
