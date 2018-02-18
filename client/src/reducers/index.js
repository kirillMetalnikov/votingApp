import {combineReducers} from 'redux';
import user from './userReducer.js';
import polls from './pollsReducer.js';
import voteForm from './voteFormReducer.js';
import isNewPoll from './isNewPoll';
import message from './message'

export default combineReducers({
  user,
  polls,
  voteForm,
  isNewPoll,
  message
})
