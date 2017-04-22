import * as types from '../actions/types';

const initialState = {
  name: '',
  websiteUrl: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NOMINATION_NAME_INPUT_CHANGE:
      return { ...state, name: action.payload };
    case types.NOMINATION_WEBSITE_URL_INPUT_CHANGE:
      return { ...state, websiteUrl: action.payload };
    default:
      return state;
  }
}
