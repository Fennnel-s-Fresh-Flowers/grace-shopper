/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('modelDefinition', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones',
        firstName: 'cody',
        lastName: 'puggy'
      })
    })

    it('returns the correct first name', () => {
      expect(cody.firstName).to.be.equal('cody')
    })
    it('returns the correct last name', () => {
      expect(cody.lastName).to.be.equal('puggy')
    })
    it('returns the correct email', () => {
      expect(cody.email).to.be.equal('cody@puppybook.com')
      expect(cody.email).to.include('@')
    })
    it('checks the default value for admin', () => {
      expect(cody.admin).to.be.equal(false)
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'cody',
          lastName: 'puggy'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
