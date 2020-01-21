import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    email,
    firstName,
    lastName,
    address,
    phone,
    handleSubmit,
    handleChange
  } = props

  return (
    <div>
      <h2>Welcome, {firstName}!</h2>
      <p>Do you need to update your information?</p>
      <div>
        <form className="user-form" onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={firstName}
              />
            </li>
            <li>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={lastName}
              />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={address}
              />
            </li>
            <li>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={phone}
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('my account map state: ', state.user)
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    address: state.user.address,
    phone: state.user.phone
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
