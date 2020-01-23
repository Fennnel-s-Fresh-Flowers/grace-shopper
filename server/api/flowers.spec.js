/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Flower = db.model('flower')

describe('Flower routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/flowers/', () => {
    const flowerName = 'tulips'

    beforeEach(() => {
      return Flower.create({
        name: flowerName,
        price: 900
      })
    })

    it('GET /api/flowers', async () => {
      const res = await request(app)
        .get('/api/flowers')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(flowerName)
    })

    it('GET /api/flowers/1', async () => {
      const res = await request(app)
        .get('/api/flowers/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(flowerName)
    })
  }) // end describe('/api/flowers')
}) // end describe('Flower routes')
