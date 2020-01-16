import React from 'react'
import {connect} from 'react-redux'

const defaultState = {firstName: '', lastName: '', address: ''}

class Checkout extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = defaultState
  }

  handleSubmit(event) {
    event.preventDefault()

    //send order to db!!

    //status: guest //find or create in db???

    this.setState(defaultState)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    console.log('user and cart on props', this.props)
    const user = this.props.user.all
    return (
      <div className="checkout">
        {user ? (
          `${user.firtName} ${user.lastName} \n ${user.address}`
        ) : (
          <form className="guest-form" onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              type="name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              type="name"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="address">Address</label>
            <input
              name="address"
              type="name"
              value={this.state.address}
              onChange={this.handleChange}
            />
            <button type="submit">Place Order</button>
          </form>
        )}
      </div>
    )
  }
}

const maptStateToProps = state => {
  return {cartItems: state.orders.all, user: state.user}
}

// const mapDispatchToProps = dispatch => {
//   return {} //place order //update state quantity and cart
// }

export default connect(maptStateToProps, null)(Checkout)
