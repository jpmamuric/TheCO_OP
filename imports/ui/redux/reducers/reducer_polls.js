import * as types from '../actions/types';

const initialState = {
  title: '',
  description: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POLL_TITLE_INPUT_CHANGE:
      return { ...state, title: action.title };
    case types.POLL_DESCRIPTION_INPUT_CHANGE:
      return { ...state, description: action.description };
    default:
      return state;
  }
}
