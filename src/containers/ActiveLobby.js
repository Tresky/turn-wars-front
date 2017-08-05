import { connect } from 'react-redux';
import Lobby from '../components/Lobby.js';
import socket from '../modules/socket.js';

const getAvailableMatches = (matches) => {
  return matches
}

const mapStateToProps = state => {
  return {
    matches: getAvailableMatches(state.matches.list)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      setInterval(() => {
        socket.getMatchList()
      }, 10000)
    }
  }
}

const ActiveLobby = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)

export default ActiveLobby
