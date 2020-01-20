const chai = require('chai')
const expect = chai.expect
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import {Provider} from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import Cart from './cart'
const chaiSpies = require('chai-spies')
const chaiThings = require('chai-things')
chai.use(chaiThings)
chai.use(chaiSpies)
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  orders: {
    single: {},
    all: [{name: 'tulip', quantity: 4}, {name: 'lilly', quantity: 8}]
  }
}
const store = mockStore(initialState)

enzyme.configure({adapter: new Adapter()})

describe('UserCart', () => {
  let myCart
  let myCartInstance

  beforeEach(() => {
    myCart = shallow(<Cart store={store} />)
    myCartInstance = myCart.instance()
  })

  it('renders an <li /> element', () => {
    expect(myCartInstance.find('li'))
      .getElement()
      .to.equal('li')
  })

  it('maps a list of items in the cart', () => {
    expect(myCartInstance.find('li')).length.to.be.equal(2)
  })
})
