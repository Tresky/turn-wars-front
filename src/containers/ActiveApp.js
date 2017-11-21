import { connect } from 'react-redux';
import App from '../App.js';

const mapDispatchToProps = dispatch => {
  return {
  }
}

const mapStateToProps = state => {
  return {
    currentState: state.app.appState
  }
}

const ActiveApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default ActiveApp
