import React from 'react'
import MainLayout from "@/layout"
import Login from './views/login'
import { Route,Routes} from 'react-router-dom'

import { renderRoutes } from './router/utils'
import { mainRoutes } from './router'
type Props = {}

const App = (props: Props) => {
  return (
<>
      <Routes>
      <Route path="/" element= {<MainLayout></MainLayout>}>
      {renderRoutes(mainRoutes)}
      </Route>
      <Route path="/login" element= {<Login/>}> </Route>
      </Routes>
</>
  )
}

export default App