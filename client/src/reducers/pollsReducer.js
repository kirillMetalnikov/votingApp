
import {GET_POLLS} from '../const.js';

export default function (state = [], action) {
  switch (action.type) {
    case GET_POLLS:
      return action.polls;
    default:
      return state;
  }
}
