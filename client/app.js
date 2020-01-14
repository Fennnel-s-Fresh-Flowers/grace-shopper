import React from 'react'

import {Navbar, Cart} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Cart />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
