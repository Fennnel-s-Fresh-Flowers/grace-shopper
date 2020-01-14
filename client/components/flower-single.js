import React from 'react'
import {getAFlower} from '../store/flowers'
import {connect} from 'react-redux'

class SingleFlower extends React.Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getAFlower(id)
  }

  render() {
    console.log(this.props)
    const {single} = this.props.flower
    return (
      <div>
        <h1>{single.name}</h1>
        <img src={single.imgUrl} />
        <p>{single.description}</p>
        <div>{single.stock} in stock</div>
        <form className="quantity-box">
          <label htmlFor="quantity">quantity</label>
          <input
            type="number"
            placeholder="1"
            // add onChange at a later date
          />
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
  return {getAFlower: id => dispatch(getAFlower(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFlower)
