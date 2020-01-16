import React from 'react'
import {connect} from 'react-redux'
import {updateOrder} from '../store/orders'

class CartEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
      //   roses: 3
    }
    console.log('IN CONSTRUCTOR', this.state)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    //   console.log('IN CDM', this.props)
    //   const items = this.props.cartItems
    //   this.setState({item: 2})
    //   console.log('IN CDM STATE', this.state)
    const newState = {}
    this.props.cartItems.forEach(flower => {
      newState[flower.name] = flower.quantity
    })
    this.setState(newState)
  }

  handleSubmit(event) {
    //dispatch cart info Be sure to note that in the db this is the order table.
    event.preventDefault()
    const items = this.props.cartItems
    items.forEach(flower => {
      flower.quantity = this.state[flower.name]
      flower.totalPrice = flower.price * flower.quantity
    })
    // console.log('SUBMIT', items)
    this.props.updateOrder(items)
    this.props.history.push('/')
    // this.setState({
    //     newCampusName: "",
    //     newCampusAddress: ""
    // })
    console.log('SUBMIT', this.props)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
    // this.setState({
    //   item: [...this.state.item, {[event.target.name]: event.target.value}]
    // })
  }

  render() {
    console.log('HEEEEEERE STATE', this.state)

    const items = this.props.cartItems
    console.log('HEEEEEERE ITEMS', items)
    // const items = [{roses: 2}]
    return (
      <div id="edit-cart">
        <h3>Edit Your Cart:</h3>
        <form>
          {/* <div> */}
          {items.map((item, index) => (
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
    updateOrder: item => dispatch(updateOrder(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartEdit)
// export default CartEdit
