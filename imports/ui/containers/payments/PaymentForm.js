import React, { Component, PropTypes } from 'react';
import { connect }           from 'react-redux';

import * as actions         from '../../redux/actions/payment';
import './PaymentForm.css'

class PaymentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCardLink = this.handleCardLink.bind(this);
    this.handleCardLinkCancel = this.handleCardLinkCancel.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { number, cvc, exp_month, exp_year, generateStripeToken } = this.props;

    console.log( { number, cvc, exp_month, exp_year })
    // generateStripeToken({ number, cvc, exp_month, exp_year });
  }

  handleCardLink(){
    this.setState({ open: true });
  }

  handleCardLinkCancel() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { number, cvc, exp_month, exp_year, cardNumberInputChange, cardCvcInputChange, cardExpMonthInputChange, cardExpYearInputChange } = this.props;
    return (
      <div className='payment_container flex_me'>
        {
          open ? (
            <form className='payment_form flex_me '>
              <div className='payment_title flex_me'>
                <h3>Link a Card</h3><span className='link_card_cancel_btn' onClick={this.handleCardLinkCancel}>X</span>
              </div>
              <input value={number} onChange={e=>cardNumberInputChange(e.target.value)} className='payment_input box_shadow' placeholder='Debit or Credit card number'/>
              <input type='number' value={exp_month} onChange={e=>cardExpMonthInputChange(e.target.value)} className='payment_input box_shadow' placeholder='expiration month'/>
              <input type='number' value={exp_year} onChange={e=>cardExpYearInputChange(e.target.value)} className='payment_input box_shadow' placeholder='expiration year'/>
              <input value={cvc} onChange={ e=>cardCvcInputChange(e.target.value)} className='payment_input box_shadow' placeholder='cvc'/>
              <button  className='payment_submit_btn box_shadow'type='submit' onClick={this.handleOnSubmit}>Submit</button>
            </form>
          ) : <button className='payment_submit_btn' onClick={this.handleCardLink}>Link a Card</button>
        }
      </div>
    );
  }

}

PaymentForm.propTypes = {
  number: PropTypes.string,
  cvc: PropTypes.string,
  exp_month: PropTypes.number,
  exp_year: PropTypes.number,
  cardNumberInputChange: PropTypes.func
}

const mapStateToProps = ({ payment }) => {
  const { number, cvc, exp_month, exp_year } = payment;
  return { number, cvc, exp_month, exp_year };
}

export default connect(mapStateToProps, actions)(PaymentForm);
