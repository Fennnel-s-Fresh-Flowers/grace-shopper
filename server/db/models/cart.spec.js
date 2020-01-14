/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('modelDefinition', () => {
    let cart

    beforeEach(async () => {
      cart = await Cart.create({
        quantity: 13
      })
    })

    it('returns the correct quantity', () => {
      expect(cart.quantity).to.be.equal(13)
      expect(cart.quantity).to.be.an('number')
    })
  })
})
