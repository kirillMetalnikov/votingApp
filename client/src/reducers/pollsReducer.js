
import {GET_POOLS} from '../const.js';

export default function (state = [], action) {
  switch (action.type) {
    case GET_POOLS:
      return action.polls;
    default:
      return state;
  }
}
