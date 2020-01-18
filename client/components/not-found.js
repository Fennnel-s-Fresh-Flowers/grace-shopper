import React from 'react'
import {Link} from 'react-router-dom'
// import errorImg from '../../public/bundle/errorPage.jpg' //currently having webpack issues with this
const NotFound = () => (
  <div id="error-page">
    <center>Oops! Page Not Found!</center>
    <img src="../../public/errorPage.jpg" />
    <center>
      <Link to="/home">Return to Home Page</Link>
    </center>
  </div>
)
export default NotFound
