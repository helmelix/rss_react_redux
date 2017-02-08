import { connect } from 'react-redux'
import { fetchChannel, fetchChannelNews, selectNews} from '../modules/channel'

import Channel from '../components/channel'


function mapStateToProps(state) {
  return {
    newsList: state.channel.newsList,
    selectedChannel: state.channel.selectedChannel,
    selectedNews: state.channel.selectedNews,
    pieChartData: state.channel.pieChartData
  };
}
const mapDispatchToProps = {
  fetchChannelNews: (url)=> fetchChannelNews(url),
  fetchChannel: (ch_id)=> fetchChannel(ch_id),
  selectNews: (news)=> selectNews(news)
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
