import React from 'react'
import {getAFlower} from '../store/flowers'
import {connect} from 'react-redux'
import {addOrderItem} from '../store/orders'

class SingleFlower extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      quantity: 1
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getAFlower(id)
  }

  handleSubmit(event) {
    //check form input validity here?
    event.preventDefault()

    const {single} = this.props.flower

    this.props.addOrderItem({
      name: single.name,
      price: single.price,
      quantity: +this.state.quantity,
      totalPrice: single.price * +this.state.quantity
      // id: single.id
    })
    this.setState({quantity: 1})
  }

  handleChange(event) {
    this.setState({quantity: event.target.value})
  }

  render() {
    const {single} = this.props.flower
    return (
      <div className="single-flower">
        <h1>{single.name}</h1>
        <img src={single.imgUrl} />
        <p>{single.description}</p>
        <div>{single.stock} in stock</div>
        <form className="quantity-box" onSubmit={this.handleSubmit}>
          <label htmlFor="quantity">quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            max={single.stock}
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    flower: state.flowers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAFlower: id => dispatch(getAFlower(id)),
    addOrderItem: item => dispatch(addOrderItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFlower)
