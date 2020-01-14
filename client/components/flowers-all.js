import React from 'react'
import {getAllFlowers} from '../store/flowers'
import {connect} from 'react-redux'
import FlowersList from './flower-list'

class AllFlowers extends React.Component {
  componentDidMount() {
    this.props.getAllFlowers()
  }

  render() {
    return (
      <div>
        <FlowersList flowers={this.props.flowers.all} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {flowers: state.flowers}
}

const mapDispatchToProps = dispatch => {
  return {getAllFlowers: () => dispatch(getAllFlowers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFlowers)
