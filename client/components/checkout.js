import React from 'react'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    //dispatch cart info.
  }
  handleChange(evt) {
    //connect to store.
  }

  render() {
    // const items = this.props.cartItems
    const {user} = this.props

    return (
      <div>
        {/* <h3>Your Order:</h3>
        {items.map(item => (
          <div key={item.id}>
            <div>{`Item: ${item.name}`}</div>
            <div>{`Quantity: ${item.quantity}`}</div>
          </div>
        ))}
        <button type="button">Edit Cart</button>

        <h4>Total: ${items.reduce((a, i) => a + i.price, 0) / 100}</h4> */}

        <h3>Your Billing Information:</h3>
        <form>
          <div>
            <label htmlFor="email">
              <small>firstName</small>
            </label>
            <input name="firstName" value={this.handleChange} type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>lastName</small>
            </label>
            <input name="lastName" value={this.handleChange} type="text" />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" value={this.handleChange} type="text" />
          </div>

          <h3>Submit Order:</h3>
          <button type="button" onClick={this.handleSubmit}>
            SUBMIT ORDER
          </button>
        </form>
      </div>
    )
  }
}

const maptStateToProps = state => {
  return {cartItems: state.user.cart, user: state.user.single}
}

// const mapDispatchToProps = dispatch => {
//   return {} //place order //update state quantity and cart
// }

export default connect(maptStateToProps, null)(Checkout)
