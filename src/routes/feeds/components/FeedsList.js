import React, { PropTypes, Component } from 'react';
import AddForm from './form'
import { addChannel, addCount } from '../modules/feeds'

import { browserHistory, Link } from 'react-router'

//import Channel from './channel'

//const FeedsList = ({ feeds, onTodoClick }) => (
class Feeds extends Component {
  componentDidMount() {
    this.props.fetchChannels();
  }

    render() {


        return (<div>
          <h1>feeds</h1>
                    <div>
            {this.props.feeds.mylist.map(list =>
                  <li key={list.id}>
                  <Link to={`/feeds/channel/${list.id}`} activeClassName='route--active'>
                      {list.name}
                  </Link>

              </li>)
          }
          </div>
          <div>
              <AddForm
                addNewChannel={(val) => {
                  this.props.addChannel(val)
                }
              }
              />
          </div>
          <div>==============
          {this.props.children && React.cloneElement(this.props.children, {
                onDeleteChannel: this.props.deleteChannel
                  })}
            </div>
        </div>
      )

    }
}



export default Feeds
