import { connect } from 'react-redux';
import Lobby from '../components/Lobby.js';
import socket from '../modules/socket.js';

const getAvailableMatches = (matches) => {
  return matches
}

const mapStateToProps = state => {
  return {
    matches: getAvailableMatches(state.matches.list),
    playerId: state.matches.playerId,
    maps: state.maps.maps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestJoin: (playerId, matchId) => {
      socket.requestJoin(playerId, matchId)
    },
    onMatchCreate: (playerId, matchInfo) => {
      socket.createMatch(playerId, matchInfo)
    }
  }
}

const ActiveLobby = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)

export default ActiveLobby
