import React from 'react'
import {Link} from 'react-router-dom'
// import errorImg from '../../public/bundle/errorPage.jpg' //currently having webpack issues with this
const NotFound = () => (
  <div id="error-page">
    <center>
      <center>Oops! Page Not Found!</center>
      {/* <img src="../../public/errorPage.jpg" /> */}
      <img src="https://i.pinimg.com/originals/7b/73/02/7b7302edb75cc113058470340418d9ef.jpg" />
      <center>
        <Link to="/home">Return to Home Page</Link>
      </center>
    </center>
  </div>
)
export default NotFound
