import React from 'react'
import {getAllProducts} from '../store/products'
import {connect} from 'react-redux'
import ProductsList from './product-list'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        <ProductsList products={this.props.products.all} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {products: state.products}
}

const mapDispatchToProps = dispatch => {
  return {getAllProducts: () => dispatch(getAllProducts())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
