import React from 'react'

import { Link,Outlet } from 'react-router-dom'
import './style/style'
function App() {



  return (
    <>
      <main> 
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default App
