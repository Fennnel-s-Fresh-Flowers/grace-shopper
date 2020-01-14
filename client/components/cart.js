import React from 'react'

class Cart extends React.Component {
  render() {
    return (
      <section className="cart">
        <ul>
          <li>imageUrl</li>
          <li>name</li>
          <li>quantity</li>
          <li>itemPrice</li>
          <li>itmeTotal</li>
          <button type="button">EditCart</button>
        </ul>
        <div>cartTotal</div>
        <button type="button">CHECKOUT</button>
      </section>
    )
  }
}

export default Cart
