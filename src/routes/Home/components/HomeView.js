import React, { Component }  from 'react'
import './HomeView.scss'

import { browserHistory} from 'react-router'

export class HomeView extends Component {
  componentDidMount() {
      browserHistory.push('/feeds')
  }

  render() {
    return (
      <div>
        <h4>Welcome!</h4>
      </div>
    )
  }

}
export default HomeView
