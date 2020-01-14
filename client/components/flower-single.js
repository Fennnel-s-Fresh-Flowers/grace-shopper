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
