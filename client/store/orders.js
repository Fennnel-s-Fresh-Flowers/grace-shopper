import axios from 'axios'

//ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_ONE_ORDER = 'GOT_ONE_ORDER'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'

//ACTION CREATORS
const gotAllOrders = orders => ({type: GOT_ALL_ORDERS, orders})
const gotOneOrder = order => ({type: GOT_ONE_ORDER, order})
export const addOrderItem = order => ({type: ADD_ORDER_ITEM, order})

export const getAllOrders = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/orders')
    dispatch(gotAllOrders(data))
  }
}

export const getAOrder = function(id) {
  console.log('in the single order thunk')
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOneOrder(data))
  }
}

//REDUCERS

export default function orderReducer(orders = {all: [], single: {}}, action) {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return {...orders, all: action.orders}
    case GOT_ONE_ORDER:
      return {...orders, single: action.order}
    case ADD_ORDER_ITEM:
      return {...orders, all: [...orders.all, action.order]}
    default:
      return orders
  }
}
