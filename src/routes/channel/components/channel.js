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
    //console.log('componentDidReceiveProps', this.props.routeParams.channel_id)
    if (!isEqual(this.props.routeParams.channel_id, nextProps.routeParams.channel_id)){
    //console.log('nextProps.routeParams.channel_id--------', nextProps.routeParams.channel_id)
    this.props.fetchChannel(nextProps.routeParams.channel_id)
              .then(()=>{
                  this.props.fetchChannelNews(this.props.selectedChannel.attributes.url)
                })
    }
  }





  render() {
    return(
      <div>
        <div>
          <button className='btn btn-default' onClick={()=>this.props.onDeleteChannel(this.props.routeParams.channel_id)}>
          Delete Channel
        </button>
        </div>
        {this.props.channel_id}

        <div>
          {this.props.newsList.map(list =>
                <li key={Math.random()} onClick={()=>this.props.selectNews(list)}>
              {list.title}
            </li>)
        }
        </div>
        <div>
          {this.props.newsList[0].description}
        </div>

        <div>
          {this.props.selectedNews.title ?
                <div>
                      <div>
                        {this.props.selectedNews.title}
                      </div>
                      <div>
                        {this.props.selectedNews.description}
                      </div>
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
                  title="Pie Chart"
                />
        </div>
      </div>

    )
  }

}
/*
Channel.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}
*/


export default Channel
