import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserThunk, deleteUser, me} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUser()
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(
      'in user home handle submit. This is being passed: ',
      this.state
    )
    return this.props.updateUser(this.state)
  }

  handleChange(event) {
    this.setState({id: this.props.user.id})
    this.setState({[event.target.name]: event.target.value})
  }

  handleDelete() {
    this.props.removeUser()
  }

  render() {
    // console.log('user home props: ', this)
    const {email, firstName, lastName, address, phone} = this.props.user
    return (
      <div>
        <h2>Welcome, {firstName}!</h2>
        <p>Do you need to update your information?</p>
        <div>
          <form className="user-form" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  defaultValue={firstName}
                />
              </li>
              <li>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                  defaultValue={lastName}
                />
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  defaultValue={email}
                />
              </li>
              <li>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  defaultValue={address}
                />
              </li>
              <li>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  onChange={this.handleChange}
                  defaultValue={phone}
                />
              </li>
              <li>
                <button type="submit">Update</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: function() {
      dispatch(me())
    },
    updateUser: function(updatedUser) {
      dispatch(updateUserThunk(updatedUser))
    },
    removeUser: function(id) {
      dispatch(deleteUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
