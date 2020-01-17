import React from 'react'
import {Link} from 'react-router-dom'

export default function FlowerList(props) {
  return (
    <div className="flower-list">
      {props.flowers.map(flower => (
        <div key={flower.id}>
          <Link to={`/flowers/${flower.id}`}>
            <img className="flower-image" src={flower.imgUrl} />
            <h3>{flower.name}</h3>
          </Link>
          <div>${flower.price / 100}</div>
        </div>
      ))}
    </div>
  )
}
