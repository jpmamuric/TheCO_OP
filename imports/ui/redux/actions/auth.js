import * as types         from './types';
import { Meteor }         from 'meteor/meteor'
import { browserHistory } from 'react-router';

// Change state of email and password
export const emailInputChange     = text => ({ type: types.EMAIL_INPUT_CHANGE, payload: text });
export const passwordInputChange  = text => ({ type: types.PASSWORD_INPUT_CHANGE, payload: text });
export const confirmPwInputChange = text => ({ type: types.CONFIRM_PW_INPUT_CHANGE, payload: text });
export const usernameInputChange  = text => ({ type: types.USERNAME_INPUT_CHANGE, payload: text });

// Check id ADMINISTRATOR
export const runAdminCheck = () => {
  const userId = Meteor.userId();
  const adminId = Meteor.settings.public.adminId;

  return dispatch => {
    if( userId === adminId) {
      console.log('admin logged in')
      dispatch({ type: types.ADMIN_AUTHENTICATION });
    }
  }
}

// Change state on user navigation
export const resetStateOnNavigation = () => ({ type: types.RESET_ON_NAVIGATION });

export const renderForms = isSignIn => ({ type: types.RENDER_FORMS, payload: isSignIn });

//Signin User Meteor
export const signInUser = ({ email, password}) => {
  return dispatch => {
    Meteor.loginWithPassword( email, password, (err) => {
      if(err) {
        dispatch({ type: types.SIGNIN_USER_FAIL, message: err.reason });
      } else {
        dispatch({ type: types.SIGNIN_USER_SUCCESS });
        browserHistory.push('/myaccount');
      }
    });
  }
}

//Signin User FACEBOOK
export const signInUserFacebook = () => {
  return dispatch => {
    Meteor.loginWithFacebook({
      requestPermissions: ['user_friends', 'public_profile', 'email']
    }, (err) => {
      if (err) {
        dispatch({ type: types.SIGNIN_USER_FAIL, message: err.message });
      } else {
        dispatch({ type: types.SIGNIN_USER_SUCCESS });
        browserHistory.push('/myaccount')
      }
    });
  }
}

//Signout User
export const signOutUser = () => {
  return dispatch => {
    Meteor.logout(function(err){
      if(err) {
        dispatch({ type: types.SIGNOUT_USER_FAIL, message: 'sorry, could not log you out' });
      } else {
        dispatch({ type: types.SIGNOUT_USER_SUCCESS });
        browserHistory.push('/signin')
      }
    }
  )
}}
