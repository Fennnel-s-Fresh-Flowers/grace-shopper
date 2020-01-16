import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  all: [],
  single: {}
}
const store = mockStore(initialState)

import reducer, {GOT_ALL_FLOWERS, getAFlower} from './flowers'

describe('flowers reducer', () => {
  const newState = reducer(initialState, {
    type: GOT_ALL_FLOWERS,
    all: 'flowers'
  })

  it('returns a new state with the updated `flowers`', () => {
    // this should have changed:
    expect(newState.campuses).to.deep.equal('flowers')
    // this should not have changed:
    expect(newState.single).to.equal(initialState.single)
  })

  it('does not modify the previous state', () => {
    expect(initialState).to.deep.equal({
      all: [],
      single: {}
    })
  })
})

const flowers = [{name: 'daisy'}, {name: 'tulip'}, {name: 'rose'}]

describe('setting multiple flowers', () => {
  describe('`getAFlower` thunk creator', () => {
    it('returns a thunk to fetch flowers from the backend and dispatch a GOT_ONE_ACTION action', async () => {
      mock.onGet('/api/flowers').replyOnce(200, flowers)
      await store.dispatch(getAFlower())
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_CAMPUSES')
      expect(actions[0].all).to.deep.equal(flowers)
    })
  })
})
