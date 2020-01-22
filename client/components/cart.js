import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import Checkout from './checkout'
import CartEdit from './cart-edit'
import {getOrderFromSession} from '../store/orders'
import GuestCheckout from './guest-checkout'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getOrderFromSession()
  }

  render() {
    const user = this.props.user
    const items = this.props.orderItems

    const totalCost = items.length
      ? items.reduce((accumulator, item) => accumulator + +item.totalPrice, 0)
      : 0

    return (
      <div id="cart">
        <section>
          <h3>CART</h3>
          {!items.length ? (
            <span>Your Cart Is Empty</span>
          ) : (
            <div>
              <ul>
                {/* the function below removes items with no quantity before mapping a list of them */}
                {items
                  .filter(item => item.quantity > 0)
                  .map((item, index) => (
                    <li key={index}>
                      {`Item: ${item.name}\n \n Quantity: ${item.quantity}`}
                    </li>
                  ))}
              </ul>

              {!totalCost ? (
                <span>Your Cart Is Empty</span>
              ) : (
                <div>
                  <h4>Total: ${totalCost / 100}</h4>
                  <div>
                    <Link to="/cart-edit">Edit Cart</Link>
                    <Route path="/cart-edit" component={CartEdit} />
                  </div>
                  {user && user.id ? (
                    <div>
                      <Link to="/checkout">Check Out</Link>
                      <Route path="/checkout" component={Checkout} />
                    </div>
                  ) : (
                    <div>
                      <div>
                        <Link to="/login">Log In</Link>
                      </div>
                      <div>
                        <Link to="/signup">Sign Up</Link>
                      </div>
                      <div>
                        <Link to="/guest-checkout">Check Out As Guest</Link>
                        <Route
                          path="/guest-checkout"
                          component={GuestCheckout}
                        />
                      </div>
                    </div>
                  )}
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
    orderItems: state.orders.session,
    user: state.user
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
