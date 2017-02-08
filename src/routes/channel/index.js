import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'channel/:channel_id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Channel = require('./containers/channel').default
      const reducer = require('./modules/channel').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'channel', reducer })

      /*  Return getComponent   */
      cb(null, Channel)

    /* Webpack named bundle   */
    }, 'channel')
  }
})
