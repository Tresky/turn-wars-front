import includes from 'lodash/includes'

import stateRenderer from './stateRenderer'
import store from '../store.js';

var clientId = undefined

function onmessage (json) {
  let message = JSON.parse(json.data)

  console.log('OnMessage', message)

  if (!message) return

  switch (message.type) {
    case 'welcome':
      console.log(' - Welcome Message')
      break
    case 'accept':
      console.log(' - Accept')
      clientId = message.playerId
      this.requestJoin(message.playerId, '00000000000000000000000000000000')
      break
    case 'matchList':
      console.log('- Match List')
      store.dispatch({
        'type': 'UPDATE_MATCH_LIST',
        'matches': message.matches
      })
      break
    case 'matchLobby':
      console.log(' - Match Lobby')
      break
    case 'gameStateChange':
      console.log(' - Game State Change')
      stateRenderer.setState(message.gameState)
      break
    case 'matchInProgress':
      console.log(' - Match In Progress')
      stateRenderer.setState(message.gameState)
      break
    case 'addMatch':
      store.dispatch({
        ...message
      })
      break
    default:
      console.log(' - Invalid Type', message.type)
      break
  }
}

/**
 * Class: Socket
 * A singleton class that allows the global scope to render
 * to a specified canvas object.
 */
class Socket {
  constructor (ip) {
    console.log('Instantiating Socket')
    this.ip = ip
    this.socket = undefined

    this.connect(this.ip)

    this.testcounter = 0
  }

  connect (ip) {
    if (ip) {
      this.ip = ip
    }

    if (this.ip) {
      this.socket = new WebSocket(this.ip)
      this.socket.onmessage = onmessage.bind(this)

      this.socket.onopen = () => {
        console.log('Connected to Socket')
        // Send reg request
        this.socket.send(JSON.stringify({
          type: 'register'
        }))
      }


      // TO BE REMOVED
      document.addEventListener('keydown', (evt) => {
      console.log('evt', evt)
      if (includes(['KeyW', 'KeyA', 'KeyS', 'KeyD'], evt.code)) {
        evt.preventDefault()
        evt.stopPropagation()

        let newCoords = stateRenderer.getState().scenario.armies[0].units[this.testcounter % 2].coordinate
        newCoords.y++

        console.log('NEWCOORDS', newCoords)

        this.socket.send(JSON.stringify({
          matchId: '00000000000000000000000000000000',
          type: 'action',
          name: 'move',
          playerId: clientId,
          to: newCoords,
          unit: {
            id: stateRenderer.getState().scenario.armies[0].units[this.testcounter % 2].id
          }
        }))

        this.testcounter++
      }
    }, false)




    }
  }

  requestJoin (playerId, matchId) {
    if (!playerId || !matchId) {
      console.warn('No Player Id or Match Id specified to join.', playerId, matchId)
      return
    }

    this.socket.send(JSON.stringify({
      type: 'join',
      playerId: playerId,
      matchId: matchId
    }))
  }

  getMatchList() {
    this.socket.send(JSON.stringify({
      type: 'listMatches',
    }))
  }
}

let socket = new Socket('ws://192.168.50.46:1026')

export default socket
