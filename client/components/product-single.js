import React from 'react'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.clickHandler = this.clickHandler.bind(this)

    this.state = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: ''
    }
  }
  componentDidMount() {
    this.setState()
  }

  clickHandler() {
    //thunk action creator to dispatch
    //push request to user's cart
  }

  render() {
    return (
      <div>
        <img src={this.state.imageUrl} />
        <div>{this.state.name}</div>
        <div>{this.state.description}</div>
        <div>{this.state.price}</div>
        <div>{this.state.stock}</div>
        <button
          type="button"
          onClick={this.clickHandler}
          className="AddToCartButton"
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

export default SingleProduct
