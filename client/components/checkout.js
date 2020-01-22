import React from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import GuestCheckout from './guest-checkout'
import {addOrderItem, clearSession} from '../store/orders'

const defaultState = {firstName: '', lastName: '', address: ''}

class Checkout extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = defaultState
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addOrderItem(this.props.orderItems)
    this.props.clearSession()
    this.setState(defaultState)
  }

  render() {
    const user = this.props.user
    const items = this.props.orderItems
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
            <Link to="/guest-checkout">Check Out As Guest</Link>
          </div>
        )}
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
    },
    clearSession: () => {
      dispatch(clearSession())
    }
  }
}

export default connect(maptStateToProps, mapDispatchToProps)(Checkout)
