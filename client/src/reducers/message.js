import {GET_MESSAGE} from '../const'

export default function (state = '', action) {
  switch (action.type) {
    case GET_MESSAGE:
      return action.message
    default:
      return state
  }
}
