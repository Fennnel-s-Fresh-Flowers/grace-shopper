import axios from 'axios'

//ACTION TYPES
const GOT_ALL_FLOWERS = 'GOT_ALL_FLOWERS'

//ACTION CREATORS
const gotAllFlowers = flowers => ({type: GOT_ALL_FLOWERS, flowers})

export const getAllFlowers = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/flowers')
    dispatch(gotAllFlowers(data))
  }
}

//REDUCERS

export default function flowerReducer(flowers = {all: [], single: {}}, action) {
  switch (action.type) {
    case GOT_ALL_FLOWERS:
      return {...flowers, all: action.flowers}
    default:
      return flowers
  }
}
