import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    const items = this.props.cartItems
    return (
      <div id="cart">
        <section>
          <h3>CART</h3>
          {!items.length ? (
            <span>Your Cart Is Empty</span>
          ) : (
            <div>
              {items.map(item => (
                <div key={item.id}>
                  <li>{`Item: ${item.name}`}</li>
                  <li>{`Quantity: ${item.quantity}`}</li>
                </div>
              ))}

              <h4>Total: ${items.reduce((a, i) => a + i.price, 0) / 100}</h4>

              <button type="button">EditCart</button>

              <button type="button">CHECKOUT</button>
            </div>
          )}
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {cartItems: state.user.cart}
}

export default connect(mapStateToProps, null)(Cart)
