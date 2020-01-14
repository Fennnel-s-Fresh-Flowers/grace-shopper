import React from 'react'
import {Link} from 'react-router-dom'

export default function ProductList(props) {
  return (
    <div className="product-list">
      {props.products.map(product => (
        <div key={product.id}>
          <Link to={`/products/:${product.id}`}>
            <img srg={product.imageUrl} />
            <h3>{product.name}</h3>
          </Link>
          <div>${product.price / 100}</div>
        </div>
      ))}
    </div>
  )
}
