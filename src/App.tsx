
import Login from './views/login'
import { Route,Routes} from 'react-router-dom'

import { renderRoutes } from './router/utils'
import { mainRoutes } from './router'
import AuthRequire from './guard/AuthRequire'
type Props = {}

const App = (props: Props) => {
  return (
<>
      <Routes>
      <Route path="/" element= {<AuthRequire></AuthRequire>}>
      {renderRoutes(mainRoutes)}
      </Route>
      <Route path="/login" element= {<Login/>}> </Route>
      </Routes>
</>
  )
}

export default App