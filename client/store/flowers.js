import axios from 'axios'

//ACTION TYPES
const GOT_ALL_FLOWERS = 'GOT_ALL_FLOWERS'
const GOT_ONE_FLOWER = 'GOT_ONE_FLOWER'

//ACTION CREATORS
const gotAllFlowers = flowers => ({type: GOT_ALL_FLOWERS, flowers})
const gotOneFlower = flower => ({type: GOT_ONE_FLOWER, flower})

export const getAllFlowers = function() {
  return async dispatch => {
    const {data} = await axios.get('/api/flowers')
    dispatch(gotAllFlowers(data))
  }
}

export const getAFlower = function(id) {
  return async dispatch => {
    const {data} = await axios.get(`/api/flowers/${id}`)
    dispatch(gotOneFlower(data))
  }
}

//REDUCERS

export default function flowerReducer(flowers = {all: [], single: {}}, action) {
  switch (action.type) {
    case GOT_ALL_FLOWERS:
      return {...flowers, all: action.flowers}
    case GOT_ONE_FLOWER:
      return {...flowers, single: action.flower}
    default:
      return flowers
  }
}
