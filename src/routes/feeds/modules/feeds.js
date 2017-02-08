import  axios  from 'axios';
// ------------------------------------
// Constants
// ------------------------------------
export const CHANNEL_ADD = 'CHANNEL_ADD'
export const COUNT_ADD = 'COUNT_ADD'
export const CHANNEL_SET_NAME = 'COUNT_ADD'
export const CHANNELS_GET = 'CHANNELS_GET'
export const CHANNELS_FETCH = 'CHANNELS_FETCH'
export const CHANNEL_SELECT = 'CHANNEL_SELECT'

export const CHANNEL_FETCH = 'CHANNEL_FETCH'
//export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function selectChannel (channel) {
  return {
    type    : CHANNEL_SELECT,
    payload : channel
  }
}

export function fetchChannels (channels = 'defaaq') {
  return (dispatch) => {
    axios.get('http://54.187.164.175:1338/channels')
       .then(function (response) {
            console.log(response.data.data);
            return response.data.data
       })
       .then(res => dispatch(getChannels(res)));
    return {
      type    : CHANNELS_FETCH,
      payload : 'channels'
    }
  }
}

export function getChannels (channels) {
  return {
    type    : CHANNELS_GET,
    payload : channels
  }
}

export function setChannelName (channelName) {
  console.log(channel);
  return {
    type    : CHANNEL_SET_NAME,
    payload : channelName
  }
}


export function addChannel (channel ={id: '', name : '', type: "", url: ""}) {
  return (dispatch) => {
  let config = {
      headers: { 'Content-Type': 'application/vnd.api+json' }
  };
  let body = JSON.stringify({data:{attributes:{'name': channel.name, 'url': channel.url}}});


  axios.post('http://54.187.164.175:1338/channels', body, config)
       .then(res => dispatch(fetchChannels()));
    //   return {
    //     type    : CHANNEL_ADD,
    //     payload : channel
    //   }
  //  dispatch({     type    : CHANNEL_ADD,     payload : channel})
    //   })
  }

}

export function deleteChannel (channel_id) {
  return (dispatch) => {
    let url = 'http://54.187.164.175:1338/channels' + '/' + channel_id
  let config = {
      headers: { 'Content-Type': 'application/vnd.api+json' }
  };
  //let body = JSON.stringify({data:{attributes:{'name': channel.name, 'url': channel.url}}});


  axios.delete(url, config)
       .then(res => dispatch(fetchChannels()));
    //   return {
    //     type    : CHANNEL_ADD,
    //     payload : channel
    //   }
  //  dispatch({     type    : CHANNEL_ADD,     payload : channel})
    //   })
  }

}



export function addCount (value) {
  return {
    type    : COUNT_ADD,
    payload : value
  }
}

export const actions = {
  addCount,
  addChannel
}

// ------------------------------------
// Action Handlers
// ------------------------------------
function handleaddCount (state, action) {
  //console.log('action.payload' + action.payload);
  let newcount =  state.count + action.payload
  //console.log('newcount.count ', newcount);
  //state = {...state, count: newcount}
  state = {...state, count: newcount}
  return state
}

function handleChannelAdd (state, action) {

  //state = {...state, channel: action.payload}
  //console.log('state.channel ', state.channel);
  return state
}

function setChannelNameReduser (state, action) {

  //state = {...state, channel: action.payload}
  //console.log('state.channel ', state.channel);
  return state //{...state, channelName: action.payload}
}

const ACTION_HANDLERS = {
//  [CHANNEL_ADD]    : (state, action) => {...state, action.payload},
[CHANNEL_ADD]    : (state, action) =>{
    let newChannel = {name: action.payload, id : Math.random()}
    let newMylist =  state.mylist.concat(newChannel)
    return state;
  },
 [COUNT_ADD]      : handleaddCount,
 [CHANNELS_GET]: (state, action) =>{
     let newMylist = []
     action.payload.forEach((val)=> newMylist.push(val))
     state = {...state, mylist: newMylist}
     return state;
},
[CHANNELS_FETCH]      : (state, action) =>{console.log('CHANNELS_FETCH')},
[CHANNEL_SELECT]    :(state, action) =>{
  state = {...state, selectedChannel: action.payload}
  return state;
}



}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
 count: 0,
 selectedChannel: '',
 mylist: [{id: 'qwf', name : '1112312', type: "channels", url: "http://qz.com/feed/"}]
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  //console.log('handler' + handler);
//  console.log('state', state);

  return handler ? handler(state, action) : state
}
