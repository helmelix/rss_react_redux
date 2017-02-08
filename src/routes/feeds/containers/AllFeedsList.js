import { connect } from 'react-redux'
import { addChannel, addCount, fetchChannels, deleteChannel, selectChannel } from '../modules/feeds'

import Feeds from '../components/FeedsList'



const getFeeds = (feeds) => {
      return feeds
}

/*
const mapStateToProps = (state) => {
  console.log(state);
  return {
    mycount: state.feeds.count,
    channelName: state.feeds.channelName,
  //  channels: [{name: 'nnna'}]//state.feeds.channels

  //  mycount:  state.count
  }
}
*/
const mapStateToProps = (state, ownProps) => ({
  channelsList : state.feeds.channelsList,
  channelsCount: state.feeds.channelsCount
  //mylist : state.feeds.mylist, //[{name: 'nnna'}, {name: 'nnaqna'}],//state.myList
})
/*
const mapStateToProps = (state) => {
  //return {
    feeds: getFeeds(state.feeds),
  //}
    count : state.count
}
*/
const mapDispatchToProps = {
  addCount: ()=> addCount(3),
  addChannel: (value)=> addChannel(value),
  fetchChannels: ()=> fetchChannels(),
  deleteChannel: (id)=> deleteChannel(id),
  selectChannel: (channel)=>selectChannel(channel)
}

//const mapDispatchToProps = (dispatch) => {

//  return {
//    onChannelClick: (id) => {
//      dispatch(selectChannel(id))
//    }
//  }
//}

const AllFeedsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feeds)

export default AllFeedsList
