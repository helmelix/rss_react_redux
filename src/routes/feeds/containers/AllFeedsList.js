import { connect } from 'react-redux'
import { addChannel,  fetchChannels, deleteChannel, selectChannel } from '../modules/feeds'

import Feeds from '../components/FeedsList'



const mapStateToProps = (state, ownProps) => ({
  channelsList : state.feeds.channelsList,
  channelsCount: state.feeds.channelsCount
})

const mapDispatchToProps = {
  addChannel: (value)=> addChannel(value),
  fetchChannels: ()=> fetchChannels(),
  deleteChannel: (id)=> deleteChannel(id),
  selectChannel: (channel)=>selectChannel(channel)
}


const AllFeedsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feeds)

export default AllFeedsList
