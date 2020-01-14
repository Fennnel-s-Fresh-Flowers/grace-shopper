import React from 'react'

class Cart extends React.Component {
  render() {
    return (
      <div className="cart">
        <section>
          <div>
            <ul>
              <li>imageUrl</li>
              <li>name</li>
              <li>quantity</li>
              <li>itemPrice</li>
              <li>itmeTotal</li>
              <button type="button">EditCart</button>
            </ul>
          </div>
          <div>cartTotal</div>
          <button type="button">CHECKOUT</button>
        </section>
      </div>
    )
  }
}

export default Cart
