import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import {Provider} from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import SingleFlower from './flower-single'
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

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleFlower component', () => {
  let renderedSingleFlower
  let singleFlowerInstance
  beforeEach(() => {
    renderedSingleFlower = shallow(
      <Provider store={store}>
        <SingleFlower />
      </Provider>
    )
    singleFlowerInstance = renderedSingleFlower.instance()
  })

  it('is a class component with state mapped to props', () => {
    expect(singleFlowerInstance.props.flower).to.eql({single: {}})
  })

  it('has a method called `handleChange` that is invoked when there is a change event triggered by the <input /> element', () => {
    expect(typeof singleFlowerInstance.handleChange).to.equal('function')
    const handleChangeSpy = sinon.spy()
    singleFlowerInstance.handleChange = handleChangeSpy
    renderedSingleFlower.setState({})
    renderedSingleFlower.find('input').simulate('change', {
      target: {value: '9', name: 'quantity'}
    })
    expect(handleChangeSpy.calledOnce).to.equal(true)
  })

  it('`handleChange` updates the local state', () => {
    renderedSingleFlower.find('input').simulate('change', {
      target: {value: '13', name: 'quantity'}
    })
    expect(singleFlowerInstance.state.quantity).to.equal('13')
  })
})
