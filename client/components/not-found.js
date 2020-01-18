import React from 'react'
import {Link} from 'react-router-dom'
import errorPage from '../../public/errorPage.png'
const NotFound = () => (
  <div>
    <img
      src={errorPage}
      style={{
        width: 400,
        height: 400,
        display: 'block',
        margin: 'auto',
        position: 'relative'
      }}
    />
    <center>
      <Link to="/">Return to Home Page</Link>
    </center>
  </div>
)
export default NotFound
