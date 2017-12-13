
import {GET_CURRENT_USER} from '../const.js';

export default function (state = null, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.user;
    default:
      return state;
  }
}
