import axios              from 'axios';
import { Meteor }         from 'meteor/meteor'
import * as types         from './types';

// Change state of email and password
export const titleInputChange = text => ({ type: types.POLL_TITLE_INPUT_CHANGE, title: text });
export const descriptionInputChange = text => ({ type: types.POLL_DESCRIPTION_INPUT_CHANGE, description: text });

export const fetchIpAddress = () => {
  return dispatch => {
    axios.get('https://jsonip.com/')
      .then(res => {
        const ip = res.data.ip
        Meteor.call( 'fetchIpAddress', { ip }, error => {
          if (error) {
            console.log(error);
          } else {
            console.log('success');
          }
        });
      })
      .catch( err=>{
        console.log(err);
      });
  }
}

export const createPoll = ({ title, description }) => {
  return dispatch => {
    if ( title !== '' && description !== '' ) {
      Meteor.call('addPoll',  { title, description } , (err, res)=> {
        if (err) {
          console.log(err);
          dispatch({ type:types.POLL_SUBMIT_FAIL, payload: 'Oops, something went wrong' });
        } else {
          dispatch({ type:types.POLL_SUBMIT_SUCCESS, payload: 'poll was successfully submitted!.' });
        }
      });
    }
  }
}

export const votePoll = (pollId, title ) => {
  return dispatch => {
    Meteor.call('votePoll', { pollId }, err => {
      if(err) {
        console.log(err);
      } else {
        console.log( 'successfully voted for Poll' );
      }
    });

    Meteor.call('addVoteHistory', { title }, err => {
      if(err) {
        console.log(err);
      } else {
        console.log( 'successfully added voting history' );
      }
    });

  }
}

export const disableVoting = () => {
  return dispatch => {
    dispatch({ type: types.POLL_DISABLE });
  }
}
