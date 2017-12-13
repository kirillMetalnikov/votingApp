import axios from 'axios';
import {GET_CURRENT_USER, GET_POOLS, GET_VOTE_FORM} from '../const.js'

export const getCurrentUser = () => dispatch => {
  axios.get('/api/current_user').then(res => {
    var {user} = res.data;
    dispatch({type: GET_CURRENT_USER, user})
  })
}

export const getPolls = () => dispatch => {
  axios.get('/api/pools').then(res => {
    dispatch({type: GET_POOLS, polls: res.data});
  })
}

export const getPoll = (id) => dispatch => {
  axios.get('/api/pools/'+ id).then(res => {
    dispatch({type: GET_VOTE_FORM, voteForm: res.data})
  })
}

export const submitPoll = (pollID, optionID) => dispatch => {
  axios.put('/api/pools/' + pollID + '/' + optionID).then(res => {
    dispatch({type: GET_VOTE_FORM, voteForm: res.data})
  })
}
