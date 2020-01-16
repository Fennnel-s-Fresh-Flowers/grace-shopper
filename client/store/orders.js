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

export default function orderReducer(orders = {all: [], single: {}}, action) {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return {...orders, all: action.orders}
    case GOT_ONE_ORDER:
      return {...orders, single: action.order}
    case ADD_ORDER_ITEM:
      return {...orders, all: helper([...orders.all, action.order])}
    default:
      return orders
  }
}

// export default function orderReducer(orders = {all: {}, single: {}}, action) {
//     switch (action.type) {
//       case GOT_ALL_ORDERS:
//         return {...orders, all: action.orders}
//       case GOT_ONE_ORDER:
//         return {...orders, single: action.order}
//       case ADD_ORDER_ITEM:
//         return {...orders, all: [...orders.all, action.order]}
//       default:
//         return orders
//     }
//   }
