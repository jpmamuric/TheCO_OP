import * as types from '../actions/types';

const initialState = {
  number: '',
  cvc: '',
  exp_month: '',
  exp_year:'',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CARD_NUMBER_INPUT_CHANGE:
      return { ...state, number: action.payload };
    case types.CVC_INPUT_CHANGE:
      return { ...state, cvc: action.payload };
    case types.EXP_MONTH_INPUT_CHANGE:
      return { ...state, exp_month: parseFloat(action.payload) };
    case types.EXP_YEAR_INPUT_CHANGE:
      return { ...state, exp_year: parseFloat(action.payload) };
    case types.GENERATE_TOKEN_SUCCESS:
      return { ...state, number: '', cvc: '', exp_month: '', exp_year: '' }
    default:
      return state;
  }
}
