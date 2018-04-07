const defaultState = {
  'maps': [],
}

const maps = (state=defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_MAP_LIST':
      return {
        ...state,
        maps: action.maps
      }
    default:
      return state
  }
}

export default maps
