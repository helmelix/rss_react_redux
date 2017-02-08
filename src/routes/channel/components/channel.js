import React, { PropTypes, Component } from 'react';
import isEqual from 'lodash/isEqual';
import { PieChart } from 'react-d3';
import { browserHistory} from 'react-router'

class Channel extends Component {

  componentWillMount(){
    this.props.fetchChannel(this.props.routeParams.channel_id)
              .then((res)=>{
                  this.props.fetchChannelNews(res.attributes.url)
              })

  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.routeParams.channel_id, nextProps.routeParams.channel_id)){
    this.props.fetchChannel(nextProps.routeParams.channel_id)
              .then((res)=>{
                  this.props.fetchChannelNews(res.attributes.url)
                })
    }
  }

  componentWillUnmount(){
    this.props.cleanSelectedData();
  }


  render() {
    return(
      <div className="row">
            <div className="col-md-6">
                    <div>
                          <h1 className="lead text-center">{this.props.selectedChannel.attributes.name}</h1>
                          <div className="space_bot">
                          <button className='btn btn-default' onClick={()=>{this.props.onDeleteChannel(this.props.routeParams.channel_id)
                                          browserHistory.push('/feeds/')
                                    }}>
                              Delete Channel
                          </button>
                          </div>
                    </div>
                    {!this.props.parceChannelFail ?


                    <div>
                        <ul className="list-group ">
                            {this.props.newsList.map(list =>
                                  <li className="list-group-item list_pointer" key={Math.random()} onClick={()=>this.props.selectNews(list)}>
                                {list.title}
                              </li>)
                          }
                        </ul>
                    </div>

                    : <h4>Error receiving data</h4>}

            </div>
            <div className="col-md-6 space_top">
                    <div>
                          {this.props.selectedNews.title ?
                                  <div>
                                      <div>
                                          <p className="lead">{this.props.selectedNews.title}</p>
                                      </div>
                                      <div dangerouslySetInnerHTML={{
                                          __html: this.props.selectedNews.description
                                          }} />
                                      <div>
                                        {this.props.selectedNews.pubDate ? this.props.selectedNews.pubDate : ''}
                                      </div>
                                  </div>
                                : <div></div>
                          }
                    </div>
                    <div>
                      {this.props.newsAmount ?
                          <div className="space_top">
                                  <div>
                                      всего каналов: {this.props.channelsCount}
                                  </div>
                                  <div>
                                      сообщений в канале: {this.props.newsAmount}
                                  </div>
                                  {!this.props.pieChartData[0] ?<div>не найдено латинских букв</div>
                                    : <div>частота появления латинских букв</div>}
                                  <div>
                                              <PieChart
                                                data={this.props.pieChartData}
                                                width={600}
                                                height={600}
                                                radius={150}
                                                innerRadius={20}
                                                sectorBorderColor="blue"
                                              />
                                  </div>
                            </div>
                        : <div></div>
                      }
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
