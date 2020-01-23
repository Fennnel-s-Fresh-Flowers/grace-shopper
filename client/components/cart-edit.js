import React from 'react'
import {connect} from 'react-redux'
import {
  updateOrderToSessionForGuest,
  updateOrderToSessionForUser
} from '../store/orders'

class CartEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const newState = {}
    this.props.orderItems.forEach(flower => {
      newState[flower.name] = flower.quantity
    })
    this.setState(newState)
  }

  handleSubmit(event) {
    //dispatch cart info Be sure to note that in the db this is the order table.
    event.preventDefault()
    const items = [...this.props.orderItems]
    items.forEach(flower => {
      flower.quantity = +this.state[flower.name]
      flower.totalPrice = flower.price * flower.quantity
    })
    const filteredItems = items.filter(item => item.quantity > 0)

    if (this.props.user && this.props.user.id) {
      this.props.updateOrderToSessionForUser(filteredItems)
    } else {
      this.props.updateOrderToSessionForGuest(filteredItems)
    }
    this.props.history.push('/flowers')
  }

  handleChange(event) {
    if (+event.target.value > +event.target.max) {
      event.target.value = +event.target.max
    }
    this.setState({[event.target.name]: +event.target.value})
  }

  render() {
    const items = this.props.orderItems
    return (
      <div id="edit-cart">
        <h3>Edit Your Cart:</h3>
        <form onSubmit={this.handleSubmit}>
          {items.filter(item => item.quantity > 0).map((item, index) => (
            <div key={index}>
              <label htmlFor="cartItem">
                <small>{item.name}</small>
              </label>
              <input
                min="0"
                max={item.stock}
                name={item.name}
                value={this.state[item.name]}
                onChange={this.handleChange}
                type="number"
              />
            </div>
          ))}
          <button type="submit">SAVE</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderItems: state.orders.session,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOrderToSessionForGuest: item =>
      dispatch(updateOrderToSessionForGuest(item)),
    updateOrderToSessionForUser: item =>
      dispatch(updateOrderToSessionForUser(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartEdit)
