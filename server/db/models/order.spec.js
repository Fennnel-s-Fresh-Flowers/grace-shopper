/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('modelDefinition', () => {
    let order

    beforeEach(async () => {
      order = await Order.create({
        total: 13
      })
    })

    it('returns the correct quantity', () => {
      expect(order.total).to.be.equal(13)
      expect(order.total).to.be.an('number')
    })
  })
})
