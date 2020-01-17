import React from 'react'
import {connect} from 'react-redux'
import {Link, Route, Switch} from 'react-router-dom'
import Checkout from './checkout'
import CartEdit from './cart-edit'

class Cart extends React.Component {
  render() {
    const items = this.props.cartItems
    console.log('IN CART', items)
    return (
      <div id="cart">
        <section>
          <h3>CART</h3>
          {!items.length ? (
            <span>Your Cart Is Empty</span>
          ) : (
            <div>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {`Item: ${item.name}\n \n Quantity: ${item.quantity}`}
                    {/* {`Quantity: ${item.quantity}`} */}
                  </li>
                ))}
              </ul>

              {/* {items.map(item => (
                <div key={item.id}>
                  <li>{`Item: ${item.name}`}</li>
                  <li>{`Quantity: ${item.quantity}`}</li>
                </div>
              ))} */}

              <h4>
                Total: ${items.reduce((a, i) => a + +i.totalPrice, 0) / 100}
              </h4>

              <Link to="/cart-edit">Edit Cart</Link>
              <Route path="/cart-edit" component={CartEdit} />

              <Link to="/checkout">Check Out</Link>
              <Route path="/checkout" component={Checkout} />
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
