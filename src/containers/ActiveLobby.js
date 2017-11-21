import { connect } from 'react-redux';
import Lobby from '../components/Lobby.js';
import socket from '../modules/socket.js';

const getAvailableMatches = (matches) => {
  return matches
}

const mapStateToProps = state => {
  return {
    matches: getAvailableMatches(state.matches.list),
    playerId: state.matches.playerId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestJoin: (playerId, matchId) => {
      socket.requestJoin(playerId, matchId)
    }
  }
}

const ActiveLobby = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)

export default ActiveLobby
