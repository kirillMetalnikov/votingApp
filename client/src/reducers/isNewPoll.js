import {IS_NEW_POLL} from '../const';

export default function (state = false, action) {
  switch (action.type) {
    case IS_NEW_POLL:
      return action.status
    default:
      return state;
  }
}
