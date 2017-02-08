import  axios  from 'axios';
// ------------------------------------
// Constants
// ------------------------------------

export const CHANNEL_FETCH = 'CHANNEL_FETCH'
export const CHANNEL_GET_NEWS = 'CHANNEL_GET_NEWS'
export const CHANNEL_GET = 'CHANNEL_GET'
export const CLEAN_SELECTED_CHANNEL = 'CLEAN_SELECTED_CHANNEL'
export const NEWS_SELECT = 'NEWS_SELECT'
export const NEWS_CHART_DATA_GET = 'NEWS_CHART_DATA_GET'
//export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------

export function fetchChannel (channel_id = '') {
  return (dispatch) => {
    return axios.get('http://54.187.164.175:1338/channels/' + channel_id)
         .then(function (response) {
            //console.log(response);
            return response.data.data
       })
       .then(res => dispatch(channelGet(res)))
  }
}

export function fetchChannelNews (channel_url = '') {
  return (dispatch) => {
    //let urll = 'http://qz.com/feed/'
    let query = 'select * from rss(0, 100) where url = "' + channel_url + '"';
    let geturl='http://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent(query);
     console.log('channel_url ', channel_url);
    axios.get(geturl)
         .then(function (response) {
            //console.log('response',  response.data.query.results.item);
            return response.data.query.results.item
         })
         .then(res => dispatch(addNews(res)));
  }
}

export function addNews (value) {
  return {
    type    : CHANNEL_GET_NEWS,
    payload : value
  }
}

export function channelGet (value) {
  return {
    type    : CHANNEL_GET,
    payload : value
  }
}

export function selectNews (value) {
  return (dispatch) => {
      dispatch({
        type    : NEWS_SELECT,
        payload : value
      })
      dispatch(renewChartData(getLettersRate(value.description)))
  }
}

export function cleanSelectedData (value) {
  return {
    type    : CLEAN_SELECTED_CHANNEL,
    payload : value
  }
}

export function renewChartData (value) {
  return {
    type    : NEWS_CHART_DATA_GET,
    payload : value
  }
}

/////////////////
function getLettersRate(str){
    function compareNumbers(a, b) {
        return a - b;
    }
    var sums = [];
    var otherSymbols = 0;
    var lettersRate = {};
    var str = str.toLowerCase();
    str.split('').map(function(e){
          if(/[a-z]+/.test(e)){
                  lettersRate[e] = !lettersRate[e] ? 1 : lettersRate[e]+1;
               }
          else otherSymbols++;
    });
    if (otherSymbols) {lettersRate['other symbols'] = otherSymbols};
    console.log('lettersRate', lettersRate);
    return lettersRate;
}

function getNewsAmount(str){
      return str.length
}

export const actions = {
  fetchChannel
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [CHANNEL_FETCH]      : (state, action) =>{
      //console.log('CHANNEL_FETCH !!!!!');
       return {...state}
    },
    [CHANNEL_GET_NEWS]      :(state, action) =>{
      let news = []
      let newsCount = getNewsAmount(action.payload)

      action.payload.forEach((val)=> news.push(val))

      state = {...state, newsList: news, newsAmount: newsCount}

      return state},
      [CHANNEL_GET] :(state, action) =>{
          state = {...state, selectedChannel: action.payload}
          return state;
     },
     [NEWS_SELECT]  :(state, action) =>{
          console.log('NEWS_SELECT', action.payload);
         state = {...state, selectedNews: action.payload}
         return state;
    },
    [CLEAN_SELECTED_CHANNEL]:(state, action) => {
      alert('qwe')
      return {...initialState}},

    [NEWS_CHART_DATA_GET]:(state, action) =>{
        console.log('NEWS_CHART_DATA_GET', action.payload);
        let letters = action.payload
        let newLetterData = [];
        function compareNumbers(a, b) {
              return a.key - b.key;
        }
        for (var letter in letters) {
            newLetterData.push({
                                label: letter,
                                value: letters[letter]
                        });
        }
        newLetterData.sort(compareNumbers);
        state = {...state, pieChartData: newLetterData}
        return state;
      }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  newsAmount: 0,
  pieChartData: [],
  selectedNews: {
      title:'',
      attributes:{url:''}
    },
 selectedChannel: {},
 newsList: [{
   title: '',
   description: '',
   link: ''
 }]
}

export default function channelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  //console.log('handler' + handler);
//  console.log('state', state);

  return handler ? handler(state, action) : state
}
