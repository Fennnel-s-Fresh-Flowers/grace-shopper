import React from 'react'
import {getAFlower} from '../store/flowers'
import {connect} from 'react-redux'
import {addToCart} from '../store/user'

class SingleFlower extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {quantity: 1}
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getAFlower(id)
    //this.setState({quantity: 0})
  }

  handleSubmit(event) {
    //check form input validity here?
    event.preventDefault()
    console.log('in cart handle submit', this.props)
    const {single} = this.props.flower

    this.props.addToCart({
      name: single.name,
      price: single.price,
      imgUrl: single.imgUrl,
      quantity: this.state.quantity,
      id: single.id
    })
  }

  handleChange(event) {
    this.setState({quantity: event.target.value})
  }

  render() {
    console.log('props on single flower', this.props)
    console.log('state on single flower', this.state)
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
          {/* <span>error message</span>  */}
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {flower: state.flowers}
}

const mapDispatchToProps = dispatch => {
  return {
    getAFlower: id => dispatch(getAFlower(id)),
    addToCart: item => dispatch(addToCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFlower)
