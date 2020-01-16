import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({adapter: new Adapter()})

import {Cart} from './cart'

// Awaiting Assistance :
// describe('UserCart', () => {
//   let myCart
//   beforeEach(() => {
//     myCart = shallow(<Cart />)
//   })

//   it('exists', function() {
//     expect.isDefined(Cart)
//   })

//   it('uses Cart as the title of the page in an h3 tag', () => {
//     expect(myCart.find('h3').text()).to.be.equal('Cart')
//   })
// })
