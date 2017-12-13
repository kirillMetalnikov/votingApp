import {GET_VOTE_FORM} from '../const.js';

export default function (state = null, action) {
  switch (action.type) {
    case GET_VOTE_FORM:
      return action.voteForm;
    default:
      return state;
  }
}
