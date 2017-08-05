
const defaultState = {
  'list': []
}

const matches = (state=defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_MATCH_LIST':
      console.log("updating");
      return {
        ...state,
        list: action.matches
      }
    default:
      return state
  }
}

export default matches
