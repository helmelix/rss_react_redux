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
          dispatch({
            type    : CHANNELS_FETCH,
            payload : 'channels'
          })

          return  axios.get('http://54.187.164.175:1338/channels')
           .then(function (response) {
                console.log(response.data.data);
                return response.data.data
           })
           .then(res => dispatch(getChannels(res)));
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
  }

}

export function deleteChannel (channel_id) {
  return (dispatch) => {
    let url = 'http://54.187.164.175:1338/channels' + '/' + channel_id
  let config = {
      headers: { 'Content-Type': 'application/vnd.api+json' }
  };

  axios.delete(url, config)
       .then(res => dispatch(fetchChannels()));
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



const ACTION_HANDLERS = {
[CHANNEL_ADD]    : (state, action) =>{
    return {...state};
  },
 [CHANNELS_GET]: (state, action) =>{
     console.log('action.payload', action.payload);
     let newMylist = []
     let channelsAmount = action.payload.length
     action.payload.forEach((val)=> newMylist.push(val))
     state = {...state, channelsList: newMylist, channelsCount : channelsAmount}
     return state;
},
[CHANNELS_FETCH]      : (state, action) =>{
    console.log('CHANNELS_FETCH')
    return {...state}
},
[CHANNEL_SELECT]    :(state, action) =>{
  state = {...state, selectedChannel: action.payload}
  return state;
}



}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {

 channelsCount: 0,
 channelsList: [{id: '', name : '', type: "channels", url: ""}]
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
