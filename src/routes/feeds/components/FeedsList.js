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


    return (


          <div className="row">
                <div className="col-md-3 space_left">
                          <h1>feeds</h1>
                          <div>
                            {this.props.channelsList.map(list =>
                                <li className="list-group-item pointer"
                                    key={list.id}
                                    onClick={()=>browserHistory.push('/feeds/channel/' + list.id)}>
                                  {list.name}


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
                </div>

                  <div className="col-md-8 space_top">
                          {this.props.children && React.cloneElement(this.props.children, {
                            onDeleteChannel: this.props.deleteChannel,
                            channelsCount: this.props.channelsCount
                          })}
                  </div>

          </div>
      )

    }
}




Feeds.propTypes = {
  addChannel: PropTypes.func.isRequired,
  fetchChannels: PropTypes.func.isRequired,
  deleteChannel: PropTypes.func.isRequired,
  selectChannel: PropTypes.func.isRequired,
  channelsList:PropTypes.array.isRequired,
  channelsCount: PropTypes.number.isRequired
};

export default Feeds
