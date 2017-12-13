import {combineReducers} from 'redux';
import user from './userReducer.js';
import polls from './pollsReducer.js';
import voteForm from './voteFormReducer.js'

export default combineReducers({
  user,
  polls,
  voteForm
})
