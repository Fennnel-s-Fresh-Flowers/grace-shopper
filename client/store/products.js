import axios from 'axios'

//ACTION TYPES
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

//ACTION CREATORS
const gotAllProducts = products => ({type: GOT_ALL_PRODUCTS, products})

export const getAllProducts = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  }
}

//REDUCERS

export default function productReducer(
  products = {all: [], single: {}},
  action
) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...products, all: action.products}
    default:
      return products
  }
}
