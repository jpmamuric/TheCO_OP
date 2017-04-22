import React, { Component } from 'react'
import { Meteor }           from 'meteor/meteor'
import { Accounts }         from 'meteor/accounts-base'
import { connect }          from 'react-redux';

import * as actions         from '../../redux/actions/auth.js';
import './SignUpFormContainer.css'

class SignUpFormContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleSignInForm = this.handleSignInForm.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPWInput = this.handleConfirmPWInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSignInForm(){
    const { renderForms } = this.props;
    renderForms(true);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, email, password, confirm, signUpUser } = this.props;
    if( password === confirm ) {

      signUpUser({ username, email, password });

    } else {
      console.log( 'unsuccessful signup');
    }

  }

  handleUsernameInput(e) {
    const { usernameInputChange } = this.props;
    usernameInputChange( e.target.value.toLowerCase() );
  }

  handleEmailInput(e) {
    const { emailInputChange } = this.props;
    emailInputChange(e.target.value.toLowerCase() );
  }

  handlePasswordInput(e) {
    const { passwordInputChange } = this.props;
    passwordInputChange( e.target.value );
  }

  handleConfirmPWInput(e) {
    const { confirmPwInputChange } = this.props;
    confirmPwInputChange( e.target.value );
  }

  render() {
    const { username, email, password, confirm, message} = this.props;
    return (
      <div className='signup_container flex_me'>
        <form className='signup_form flex_me' onSubmit={this.handleSubmit}>
          <span>{ message === '' ? null : message}</span>
          <input className='signup_input box_shadow' placeholder='username' type='text' value={username} onChange={this.handleUsernameInput} required />
          <input className='signup_input box_shadow' placeholder='email' type='email' value={email} onChange={this.handleEmailInput} required />
          <input className='signup_input box_shadow' placeholder='password' type='password' value={password} onChange={this.handlePasswordInput} required />
          <input className='signup_input box_shadow' placeholder='confirm password' type='password' value={ confirm} onChange={this.handleConfirmPWInput} required />
          <button className='signup_submit_btn' type='submit'> Sign Up </button>
        </form>
        <p className='signin_content' >Already have an account? <span className='btn_signin_account' onClick={this.handleSignInForm}>sign in</span></p>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const { email, password, username, authenticated, confirm, message } = auth;
  return { email, password, username, authenticated, confirm, message };
}

export default connect(mapStateToProps, actions)(SignUpFormContainer);
