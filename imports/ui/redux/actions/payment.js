import * as types  from './types';

// Change state of payment inputs
export const cardNumberInputChange      = text => ({ type: types.CARD_NUMBER_INPUT_CHANGE, payload: text });
export const cardCvcInputChange         = text => ({ type: types.CVC_INPUT_CHANGE, payload: text });
export const cardExpMonthInputChange    = number => ({ type: types.EXP_MONTH_INPUT_CHANGE, payload: number });
export const cardExpYearInputChange     = number => ({ type: types.EXP_YEAR_INPUT_CHANGE, payload: number });

//Link a Credit or debit card
export const generateStripeToken = ({ number, cvc, exp_month, exp_year }) => {
  return dispatch => {
    Stripe.card.createToken({ number, cvc, exp_month, exp_year }, function(status, response){
      if( response.error) {
        console.log(responese.error.message)
      } else {
        const stripeToken = response.id;
        console.log(response)
        console.log(stripeToken)
      }
    });
  };
}
