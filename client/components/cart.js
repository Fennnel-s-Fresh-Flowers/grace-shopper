import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import Checkout from './checkout'
import CartEdit from './cart-edit'
import {getOrderFromSession} from '../store/orders'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getOrderFromSession()
  }

  render() {
    const items = this.props.orderItems
    // console.log('IN CART!!!!!!!!', this.props)
    return (
      <div id="cart">
        <section>
          <h3>CART</h3>
          {!items.length ? (
            <span>Your Cart Is Empty</span>
          ) : (
            <div>
              <ul>
                {items
                  .filter(item => item.quantity > 0)
                  .map((item, index) => (
                    <li key={index}>
                      {`Item: ${item.name}\n \n Quantity: ${item.quantity}`}
                    </li>
                  ))}
              </ul>

              {!items.reduce((a, i) => a + +i.totalPrice, 0) ? (
                <span>Your Cart Is Empty</span>
              ) : (
                <div>
                  <h4>
                    Total: ${items.reduce((a, i) => a + +i.totalPrice, 0) / 100}
                  </h4>
                  <div>
                    <Link to="/cart-edit">Edit Cart</Link>
                    <Route path="/cart-edit" component={CartEdit} />
                  </div>
                  <div>
                    <Link to="/checkout">Check Out</Link>
                    <Route path="/checkout" component={Checkout} />
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderItems: state.orders.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderFromSession: () => {
      dispatch(getOrderFromSession())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
