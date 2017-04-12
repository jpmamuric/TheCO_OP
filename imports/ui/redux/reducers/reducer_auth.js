import * as types from '../actions/types';

const initialState = {
  isAdmin: false,
  isSignin: true,
  authenticated: false,
  email: '',
  password: '',
  username: '',
  confirm: '',
  message: '',
  signInLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EMAIL_INPUT_CHANGE:
      return { ...state, email: action.payload };
    case types.PASSWORD_INPUT_CHANGE:
      return { ...state, password: action.payload };
    case types.CONFIRM_PW_INPUT_CHANGE:
      return { ...state, confirm: action.payload };
    case types.USERNAME_INPUT_CHANGE:
      return { ...state, username: action.payload };
    case types.RESET_ON_NAVIGATION:
      return { ...state, email: '', password: '', username: '', confirm: '', message: '' };
    case types.SIGNIN_USER_SUCCESS:
      return { ...state, authenticated: true, email: '', password: '', message: '', isSignin: true };
    case types.SIGNIN_USER_FAIL:
      return { ...state, message: action.message };
    case types.SIGNOUT_USER_SUCCESS:
      return { ...state, authenticated: false, message: '', isSignin: true, isAdmin: false};
    case types.ADMIN_AUTHENTICATION:
      return { ...state, isAdmin: true };
    case types.RENDER_FORMS:
      return { ...state, isSignin: action.payload };
    default:
      return state;
  }
}
