import axios from 'axios';
import {GET_CURRENT_USER, GET_POLLS, GET_VOTE_FORM, GET_USER_POLLS, IS_NEW_POLL} from '../const.js'

export const getCurrentUser = () => dispatch => {
  axios.get('/api/current_user').then(res => {
    var {user} = res.data;
    dispatch({type: GET_CURRENT_USER, user});
  })
}

export const getPolls = () => dispatch => {
  axios.get('/api/pools').then(res => {
    dispatch({type: GET_POLLS, polls: res.data});
  })
}

export const getPoll = (id) => dispatch => {
  dispatch({type: GET_VOTE_FORM, voteForm: null});
  axios.get('/api/pools/'+ id).then(res => {
    dispatch({type: GET_VOTE_FORM, voteForm: res.data});
  })
}

export const deletePoll = (id) => dispatch => {
  axios.delete('/api/pools/'+ id)
  .then(() => axios.get('/api/user_pools'))
  .then(res => {
    dispatch({type: GET_POLLS, polls: res.data});
  })
}

export const addPoll = (values) => dispatch => {
  axios.post('/api/user_pools', values)
    .then(() => axios.get('/api/user_pools'))
    .then( res => {
      dispatch({type: GET_POLLS, polls: res.data})
    })
}

export const submitPoll = (pollID, optionID) => dispatch => {
  axios.put('/api/pools/' + pollID + '/' + optionID).then(res => {
    console.log(res);
    if(res.data.message) {
      console.log(res.data.message)
    } else {
      dispatch({type: GET_VOTE_FORM, voteForm: res.data});
    }
  })
}

export const userPolls = (userID) => dispatch => {
  axios.get('/api/user_pools').then(res => {
    dispatch({type: GET_POLLS, polls: res.data});
  })
}

export const setIsNewPoll = (status) => dispatch => {
  dispatch({type: IS_NEW_POLL, status: status})
}
