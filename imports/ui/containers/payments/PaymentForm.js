import React, { Component }  from 'react';
import { connect }           from 'react-redux';

import * as actions         from '../../redux/actions/payment';
import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import './PaymentForm.css'

class PaymentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      openSubmit: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCardLink = this.handleCardLink.bind(this);
    this.handleCardLinkCancel = this.handleCardLinkCancel.bind(this);
  }

  handleClose(){
    this.setState({ openSubmit: false });
  }

  handleOpen(){
    this.setState({ open: true });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { number, cvc, exp_month, exp_year, generateStripeToken } = this.props;

    this.setState({ openSubmit: false })
    generateStripeToken({ number, cvc, exp_month, exp_year });
  }

  handleCardLink(e){
    e.preventDefault();
    this.setState({ openSubmit: true });
  }

  handleCardLinkCancel() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const { open, openSubmit } = this.state;
    const { number, cvc, exp_month, exp_year, cardNumberInputChange, cardCvcInputChange, cardExpMonthInputChange, cardExpYearInputChange } = this.props;
    return (
      <div className='payment_container flex_me'>
        {
          open ? (
            <form className='payment_form flex_me '>
              <div className='payment_title flex_me'>
                <h3>Link/Update a Card</h3><span className='link_card_cancel_btn' onClick={this.handleCardLinkCancel}>X</span>
              </div>
              <input type='text' value={number} onChange={e=>cardNumberInputChange(e.target.value)} className='payment_input box_shadow' placeholder='Debit or Credit card number'/>
              <input type='number' value={exp_month} onChange={e=>cardExpMonthInputChange(e.target.value)} className='payment_input box_shadow' placeholder='expiration month'/>
              <input type='number' value={exp_year} onChange={e=>cardExpYearInputChange(e.target.value)} className='payment_input box_shadow' placeholder='expiration year'/>
              <input value={cvc} onChange={ e=>cardCvcInputChange(e.target.value)} className='payment_input box_shadow' placeholder='cvc'/>
                <div>
                  <button className='payment_submit_btn' onClick={this.handleCardLink}>Save Card</button>
                </div>

            </form>
          ) : <button className='payment_submit_btn' onClick={this.handleOpen}>Link/Update a Card</button>
        }

        <Dialog
          title={`Are you sure?`}
          actions={actions}
          modal={true}
          open={openSubmit}
          onRequestClose={this.handleClose}
        >
        <div>
          <h3>Terms and Conditions</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>

        </div>
          <button  className='payment_submit_btn box_shadow'type='submit' onClick={this.handleOnSubmit}>Submit</button>
        </Dialog>
      </div>
    );
  }

}


const mapStateToProps = ({ payment }) => {
  const { number, cvc, exp_month, exp_year } = payment;
  return { number, cvc, exp_month, exp_year };
}

export default connect(mapStateToProps, actions)(PaymentForm);
