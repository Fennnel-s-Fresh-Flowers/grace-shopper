/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: 'cody',
        lastName: 'puggy'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users/1', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })

    it('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({firstName: 'John', lastName: 'Lane', email: 'lane@email.com'})
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.firstName).to.be.equal('John')
      expect(res.body.lastName).to.be.equal('Lane')
      expect(res.body.email).to.be.equal('lane@email.com')
    })

    it('DELETE /api/users/1', async () => {
      const res = await request(app)
        .delete('/api/users/1')
        .expect(204)

      expect(res.body).to.be.an('object')
      expect(res.body.firstName).to.be.equal(undefined)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
