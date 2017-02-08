import React, { PropTypes, Component } from 'react';
import isEqual from 'lodash/isEqual';
//import rd3 from 'react-d3';
import { PieChart } from 'react-d3';


class Channel extends Component {

  componentWillMount(){
    //console.log('componentWillMount')
    this.props.fetchChannel(this.props.routeParams.channel_id)
              .then(()=>{
                  this.props.fetchChannelNews(this.props.selectedChannel.attributes.url)
              })

  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.routeParams.channel_id, nextProps.routeParams.channel_id)){
    //console.log('nextProps.routeParams.channel_id--------', nextProps.routeParams.channel_id)
    this.props.fetchChannel(nextProps.routeParams.channel_id)
              .then(()=>{
                  this.props.fetchChannelNews(this.props.selectedChannel.attributes.url)
                })
    }
  }

  componentWillUnmount(){
    this.props.cleanSelectedData();
  }




  render() {
    return(
      <div className="row">
            <div className="col-md-6 space_top">
                    <div>
                          <button className='btn btn-default' onClick={()=>this.props.onDeleteChannel(this.props.routeParams.channel_id)}>
                              Delete Channel
                          </button>
                    </div>
                    <div>
                        <ul className="list-group">
                            {this.props.newsList.map(list =>
                                  <li className="list-group-item" key={Math.random()} onClick={()=>this.props.selectNews(list)}>
                                {list.title}
                              </li>)
                          }
                        </ul>
                    </div>
            </div>
            <div className="col-md-6 space_top">
                    <div>
                        всего каналов: {this.props.channelsCount}
                    </div>
                    <div>
                        сообщений в канале: {this.props.newsAmount}
                    </div>
                    <div>
                          {this.props.selectedNews.title ?
                                  <div>
                                      <div>
                                          <p className="lead">{this.props.selectedNews.title}</p>
                                      </div>
                                      <div dangerouslySetInnerHTML={{
                                          __html: this.props.selectedNews.description
                                          }} />

                                  </div>
                                : <div>no news selected</div>
                          }
                    </div>
                    <div>
                                <PieChart
                                  data={this.props.pieChartData}
                                  width={400}
                                  height={400}
                                  radius={100}
                                  innerRadius={20}
                                  sectorBorderColor="white"
                                />
                    </div>
            </div>
      </div>


    )
  }

}

Channel.propTypes = {
  fetchChannelNews: PropTypes.func.isRequired,
  fetchChannel: PropTypes.func.isRequired,
  selectNews: PropTypes.func.isRequired,
  cleanSelectedData: PropTypes.func.isRequired,
  newsList: PropTypes.array.isRequired,
  selectedChannel: PropTypes.object.isRequired,
  selectedNews: PropTypes.object.isRequired,
  pieChartData: PropTypes.array.isRequired,
  newsAmount: PropTypes.number.isRequired
}



export default Channel
