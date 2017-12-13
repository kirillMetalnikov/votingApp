import {combineReducers} from 'redux';
import user from './userReducer.js';
import polls from './pollsReducer.js';
import activePoll from './activePollReducer.js'

export default combineReducers({
  user,
  polls,
  activePoll
})
