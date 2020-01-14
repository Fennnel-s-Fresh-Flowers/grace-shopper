/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Flower = db.model('flower')

describe('Flower model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('modelDefinition', () => {
    let flower

    beforeEach(async () => {
      flower = await Flower.create({
        name: 'lilac',
        price: 1700
      })
    })

    it('returns the correct name', () => {
      expect(flower.name).to.be.equal('lilac')
    })
    it('returns the correct price', () => {
      expect(flower.price).to.be.equal(1700)
      expect(flower.price).to.be.an('number')
    })
  })
})
