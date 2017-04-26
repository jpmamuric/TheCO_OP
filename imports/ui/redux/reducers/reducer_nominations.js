import * as types from '../actions/types';

const initialState = {
  name: '',
  websiteUrl: '',
  description: '',
  fullName: '',
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NOMINATION_NAME_INPUT_CHANGE:
      return { ...state, name: action.payload };
    case types.NOMINATION_WEBSITE_URL_INPUT_CHANGE:
      return { ...state, websiteUrl: action.payload };
    case types.NOMINATION_DESCRIPTION_INPUT_CHANGE:
      return { ...state, description: action.payload };
    case types.NOMINATION_FULLNAME_INPUT_CHANGE:
      return { ...state, fullName: action.payload };
    case types.RESET_NOMINATION_FORM_ON_NAVIGATION:
      return { ...state, name: '', websiteUrl: '', fullName: '', description: '', message: '' };
    case types.NOMINATION_SUBMIT_SUCCESS:
      return { ...state, name: '', websiteUrl: '', fullName: '', description: '', message: action.payload };
    case types.NOMINATION_SUBMIT_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
