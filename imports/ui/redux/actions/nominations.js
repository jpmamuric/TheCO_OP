import * as types from './types';
import { Meteor } from 'meteor/meteor'

export const nominationNameInputChange = text => ({ type: types.NOMINATION_NAME_INPUT_CHANGE, payload: text });

export const nominationWebsiteUrlInputChange  = text => ({ type: types.NOMINATION_WEBSITE_URL_INPUT_CHANGE, payload: text });

export const nominationFullNameInputChange  = text => ({ type: types.NOMINATION_FULLNAME_INPUT_CHANGE, payload: text });

export const nominationDescriptionInputChange  = text => ({ type: types.NOMINATION_DESCRIPTION_INPUT_CHANGE, payload: text });

export const dispatchNominationMessage = message => ({ type: types.DISPATCH_NOMINATION_MESSAGE, payload: message });

export const createNomination = ({ name, websiteUrl, fullName, description }) => {
  return dispatch => {
    if ( name !== '' && description !== '' && websiteUrl !== '' ) {
      Meteor.call('addNomination',  { name, websiteUrl, fullName, description } , (err, res)=> {
        if (err) {
          console.log(err);
          dispatch({ type:types.NOMINATION_SUBMIT_FAIL, payload: 'Oops, something went wrong' });
        } else {
          dispatch({ type:types.NOMINATION_SUBMIT_SUCCESS, payload: 'Your nomination was successfully submitted! and pending review.' });
        }
      });
    }
  }
}

export const removeNomination = nominationId => {
  return dispatch => {
    Meteor.call('removeNomination', { nominationId }, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('successfully removed nomination');
      }
    });
  }
}

export const vetNomination = nominationId => {
  return dispatch => {
    Meteor.call('vetNomination', { nominationId }, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('successfully vetted nomination');
      }
    });
  }
}

export const unVetNomination = nominationId => {
  return dispatch => {
    Meteor.call('unvetNomination', { nominationId }, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('successfully unvetted nomination');
      }
    });
  }
}

export const voteNomination = nominationId => {
  return dispatch => {
    Meteor.call('voteNomination', { nominationId }, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('successfully voted for nomination');
      }
    });
  }
}
