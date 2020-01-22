import React from 'react'
import {Link} from 'react-router-dom'

export default function PastOrders(props) {
  console.log('past orders list generator. props: ', props)
  const {orders} = props
  //this should generate past orders from the user by mapping though the orders, mapping through the eager-loaded array of contents of the order
  return (
    <div>
      <h2>Your past orders:</h2>
      <ul>
        {orders.map(order => {
          const date = order.updatedAt.slice(0, 10)
          return (
            <div key={order.id}>
              <li>
                <h3>Ordered on {date}</h3>
                <p>Total: ${order.total / 100}</p>
                <ul>
                  {order.flowers.map(flower => {
                    return (
                      <div key={flower.id}>
                        <li>
                          <Link to={`/flowers/${flower.id}`}>
                            <h4>
                              {flower.orderFlower.quantity} {flower.name}s
                            </h4>
                            <h4>${flower.price / 100} each</h4>
                            <img className="order-images" src={flower.imgUrl} />
                          </Link>
                        </li>
                      </div>
                    )
                  })}
                </ul>
              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
