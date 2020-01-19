import React from 'react'
import {connect} from 'react-redux'
import {updateOrder} from '../store/orders'

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
    this.props.cartItems.forEach(flower => {
      newState[flower.name] = flower.quantity
    })
    this.setState(newState)
  }

  handleSubmit(event) {
    //dispatch cart info Be sure to note that in the db this is the order table.
    event.preventDefault()
    const items = [...this.props.cartItems]
    // this.setState(items)
    items.forEach(flower => {
      flower.quantity = +this.state[flower.name]
      flower.totalPrice = flower.price * flower.quantity
    })

    this.props.updateOrder(items)
    this.props.history.push('/')
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const items = this.props.cartItems
    // console.log('IN EDIT CART', items)
    return (
      <div id="edit-cart">
        <h3>Edit Your Cart:</h3>
        <form>
          {/* <div> */}
          {items.filter(item => item.quantity > 0).map((item, index) => (
            <div key={index}>
              <label htmlFor="cartItem">
                <small>{item.name}</small>
              </label>
              <input
                // name="quantity"
                name={item.name}
                // value={item.quantity}
                value={this.state[item.name]}
                onChange={this.handleChange}
                type="number"
              />
            </div>
          ))}

          {/* <label htmlFor="cartItem">
              <small>firstName</small>
            </label>
            <input name="firstName" value={this.handleChange} type="text" /> */}
          {/* </div> */}

          {/* <h3>Save New Cart:</h3> */}
          <button type="button" onClick={this.handleSubmit}>
            SAVE
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {cartItems: state.orders.all}
}

const mapDispatchToProps = dispatch => {
  return {
    updateOrder: item => {
      dispatch(updateOrder(item)) //.then(() => {
      //     history.push('/')
      //   })
      //   ownProps.history.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartEdit)
// export default CartEdit
