import * as types from '../actions/types';

const initialState = {
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.COUNTDOWN_CHANGE_SUCCESS:
      return { ...state, message: action.payload };
    case types.COUNTDOWN_CHANGE_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
