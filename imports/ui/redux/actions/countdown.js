import * as types from './types';
import { Meteor } from 'meteor/meteor'

export const updateCountdownDate = ( countdownId, countdownDate ) => {
  return dispatch => {
    Meteor.call('changeCountdownDate', { countdownId, countdownDate } , err => {
      if(err) {
        console.log(err);
        dispatch({ type: types.COUNTDOWN_CHANGE_FAIL, payload: 'somethingg went wrong.' });
      } else {
        dispatch({ type: types.COUNTDOWN_CHANGE_SUCCESS, payload: 'successfully changed countdown date.' });
      }
    });
  }
}
