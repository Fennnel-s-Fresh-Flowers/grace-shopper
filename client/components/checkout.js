import React from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import GuestCheckout from './guest-checkout'
import {addOrderItem} from '../store/orders'

const defaultState = {firstName: '', lastName: '', address: ''}

class Checkout extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)

    this.state = defaultState
  }

  // componentDidMount() {
  //   // const newState = {}
  //   // this.props.orderItems.forEach(flower => {
  //   //   newState[flower.name] = flower.quantity
  //   // })
  //   // this.setState(newState)
  // }

  handleSubmit(event) {
    event.preventDefault()
    addOrderItem(this.props.orderItems)
    this.setState(defaultState)
  }

  // handleChange(evt) {
  //   this.setState({[evt.target.name]: evt.target.value})
  // }

  render() {
    // console.log('user and cart on props', this.props)
    const user = this.props.user
    const items = this.props.orderItems
    // console.log('items', items)
    return (
      <div className="checkout">
        {user && user.id ? (
          <form className="guest-form" onSubmit={this.handleSubmit}>
            <button type="submit" disabled={!items.length}>
              Place Order
            </button>
          </form>
        ) : (
          <div>
            {/* <h1>HEEERRE</h1> */}
            <Link to="/guest-checkout">Check Out As Guest</Link>
          </div>
        )}

        {/* {user ? (
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
        )} */}
      </div>
    )
  }
}

const maptStateToProps = state => {
  return {
    orderItems: state.orders.session,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrderItem: item => {
      dispatch(addOrderItem(item))
    }
  } //place order //update state quantity and cart
}

export default connect(maptStateToProps, mapDispatchToProps)(Checkout)
