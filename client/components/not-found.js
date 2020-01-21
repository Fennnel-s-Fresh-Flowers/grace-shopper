import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div id="error-page">
    <center>
      <center>Oops! Page Not Found!</center>
      {/* <img src="../../public/errorPage.jpg" /> */}
      <img src="/errorPage.jpg" />
      <center>
        <Link to="/home">Return to Home Page</Link>
      </center>
    </center>
  </div>
)
export default NotFound
