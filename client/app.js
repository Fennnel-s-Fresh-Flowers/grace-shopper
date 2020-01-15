import React from 'react'

import {Navbar, Cart} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Cart />
      <div id="everything">
        <Navbar />
        <Routes />
      </div>
    </div>
  )
}

export default App
