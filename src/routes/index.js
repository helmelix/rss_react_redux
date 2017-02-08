import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import FeedsRoute from './feeds'
import ChanelRoute from './channel'



export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [{
    ...FeedsRoute(store),
      childRoutes :[
        ChanelRoute(store)
      ]
    }
  ]
})



export default createRoutes
