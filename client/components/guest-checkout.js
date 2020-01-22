import React from 'react'
import {checkoutForGuest, clearSession} from '../store/orders'
import {connect} from 'react-redux'

const defaultState = {firstName: '', lastName: '', address: ''}

class GuestCheckout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.checkoutForGuest(this.props.orderItems)
    this.props.clearSession()
    this.setState(defaultState)
  }

  render() {
    const items = this.props.orderItems

    return (
      <div>
        <form className="guest-form" onSubmit={this.handleSubmit}>
          <button type="submit" disabled={!items.length}>
            Place Order
          </button>
        </form>
      </div>
    )
  }
}
const maptStateToProps = state => {
  return {
    orderItems: state.orders.session
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkoutForGuest: item => {
      dispatch(checkoutForGuest(item))
    },
    clearSession: () => {
      dispatch(clearSession())
    }
  }
}

export default connect(maptStateToProps, mapDispatchToProps)(GuestCheckout)
