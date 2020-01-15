import React from 'react'
import {connect} from 'react-redux'

class CartEdit extends React.Component {
  render() {
    // const items = this.props.cartItems
    return (
      <div id="edit-cart">
        <h1>EDIT CART</h1>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {cartItems: state.user.all}
// }

// export default connect(mapStateToProps, null)(CartEdit)
export default CartEdit
