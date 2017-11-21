const defaultState = {
  'list': [],
  'status': 'browsing',
  'playerId': '',
}

const matches = (state=defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_MATCH_LIST':
      console.log("updating");
      return {
        ...state,
        list: action.matches
      }
    case 'REQUEST_JOIN':
      console.log('joining');
      return {
        ...state,
        status: 'joining',
      }
    case 'UPDATE_PLAYER_ID':
      return {
        ...state,
        playerId: action.id,
      }
    default:
      return state
  }
}

export default matches
