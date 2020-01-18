import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav id="nav-bar">
      <div className="nav-pair">
        <Link to="/home">Home</Link>
        <Link to="/flowers">Flowers</Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-pair">
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <p />
          <Link to="/userHome">My Account</Link>
          {/* <a>Settings</a> */}
        </div>
      ) : (
        <div className="nav-pair">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {/* The navbar will show these links before you log in */}
        </div>
      )}
    </nav>
    <hr id="nav-hr" />
    <h1 id="title">
      <div id="title-text">FENNEL'S FRESH FLOWERS</div>
    </h1>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
