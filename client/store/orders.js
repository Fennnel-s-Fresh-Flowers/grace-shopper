import axios from 'axios'

//ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_ONE_ORDER = 'GOT_ONE_ORDER'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const UPDATE_ORDER = 'UPDATE_ORDER'
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

export const clearCart = empty => ({type: CLEAR_CART, empty})

export const addOrderItem = order => ({type: ADD_ORDER_ITEM, order})
export const updateOrder = order => ({type: UPDATE_ORDER, order})

// export const getAllOrders = function() {
//   return async dispatch => {
//     const {data} = await axios.get('/api/orders')
//     dispatch(gotAllOrders(data))
//   }
// }

export const getAnOrder = function(id) {
  console.log('in the single order thunk')
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOneOrder(data))
  }
}

export const addOrderToSession = function(orderItem) {
  const sentItem = []
  sentItem.push(orderItem) //using spread was serving an error
  //   console.log('in add order to session thunk. Order item: ', orderItem)
  //   console.log('HEEEEEERE', sentItem)
  return async dispatch => {
    const {data} = await axios.post(`/api/session/`, sentItem)
    dispatch(addedOrderToSession(data))
  }
}

export const updateOrderInSession = function(order) {
  // const sentItem = []
  // sentItem.push(orderItem) //using spread was serving an error
  //   console.log('in add order to session thunk. Order item: ', orderItem)
  //   console.log('HEEEEEERE', sentItem)
  return async dispatch => {
    const {data} = await axios.put(`/api/session/`, order)
    dispatch(updatedOrderInSession(data))
  }
}

export const getOrderFromSession = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/session')
    dispatch(gotOrderFromSession(data))
  }
}

//REDUCERS

function helper(arr) {
  if (!arr.length) return arr
  let newArr = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    let elem = arr[i]
    let result
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j].name === elem.name) {
        newArr[j].quantity += elem.quantity
        newArr[j].totalPrice += elem.totalPrice
        result = true
      }
    }
    if (!result) newArr.push(elem)
  }
  return newArr
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
    case ADD_ORDER_ITEM:
      return {...orders, all: helper([...orders.all, action.order])}
    case UPDATE_ORDER:
      return {...orders, all: action.order.filter(item => item.quantity > 0)}
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
