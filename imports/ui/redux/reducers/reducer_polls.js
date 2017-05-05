import * as types from '../actions/types';

const initialState = {
  title: '',
  description: '',
  submitMessage: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POLL_TITLE_INPUT_CHANGE:
      return { ...state, title: action.title };
    case types.POLL_DESCRIPTION_INPUT_CHANGE:
      return { ...state, description: action.description };
    case types.POLL_SUBMIT_SUCCESS:
      return { ...state, submitMessage: action.payload, title: '', description: '', submitMessage: '' };
    case types.POLL_SUBMIT_FAIL:
      return { ...state, submitMessage: action.payload,  submitMessage: action.payload };
    default:
      return state;
  }
}
