import React from 'react'

class SingleItemInCart extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      name: '',
      quantity: 0,
      itemPrice: 0
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    return (
      <div id="cart">
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

export default SingleItemInCart
