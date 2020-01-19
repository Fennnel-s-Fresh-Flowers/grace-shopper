import React from 'react'
import {connect} from 'react-redux'
import {Link, Route, Switch} from 'react-router-dom'
import Checkout from './checkout'
import CartEdit from './cart-edit'

class Cart extends React.Component {
  render() {
    const items = this.props.cartItems
    // console.log('IN CART', items)
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
                  <p>
                    <Link to="/cart-edit">Edit Cart</Link>
                    <Route path="/cart-edit" component={CartEdit} />
                  </p>
                  <p>
                    <Link to="/checkout">Check Out</Link>
                    <Route path="/checkout" component={Checkout} />
                  </p>
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
    cartItems: state.orders.all
  }
}

export default connect(mapStateToProps, null)(Cart)
