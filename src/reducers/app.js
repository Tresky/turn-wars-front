const defaultState = {
  'appState': 'lobby',
}

const app = (state=defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_APP_STATE':
      return {
        ...state,
        appState: action.state,
      }
    default:
      return state
  }
}

export default app
