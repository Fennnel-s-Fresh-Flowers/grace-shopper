import React from 'react'
import {Link} from 'react-router-dom'
// import errorImg from '../../public/bundle/errorPage.jpg' //currently having webpack issues with this
const NotFound = () => (
  <div id="error-page">
    <img src="../../public/errorPage.jpg" />
    <center>
      <Link to="/">Return to Home Page</Link>
    </center>
  </div>
)
export default NotFound
