import {expect} from 'chai'
import {getAllFlowers, getAFlower} from './flowers'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    all: [],
    single: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllFlowers', () => {
    it('eventually dispatches the GOT_ALL_FLOWERS action', async () => {
      const fakeFlowers = [{name: 'rose'}, {name: 'tulip'}]
      mockAxios.onGet('/api/flowers').replyOnce(200, fakeFlowers)
      await store.dispatch(getAllFlowers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_FLOWERS')
      expect(actions[0].flowers).to.be.deep.equal(fakeFlowers)
    })
  })

  describe('getAFlower', () => {
    it('eventually dispatches the GOT_ONE_FLOWER action', async () => {
      const fakeFlower = {name: 'lilly'}
      mockAxios.onGet('/api/flowers/1').replyOnce(204, fakeFlower)
      await store.dispatch(getAFlower(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ONE_FLOWER')
      expect(actions[0].flower).to.be.deep.equal(fakeFlower)
    })
  })
})
