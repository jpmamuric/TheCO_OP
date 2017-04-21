import React, { Component } from 'react';
import { Meteor }           from 'meteor/meteor'
import { connect }          from 'react-redux';

import { LoginButtons }     from 'meteor/okgrow:accounts-ui-react';
import * as actions         from '../../redux/actions/auth';

import './SignInFormContainer.css';

class SignInFormContainer extends Component {
  constructor (props) {
    super(props);

    this.handleOnEmailChange          = this.handleOnEmailChange.bind(this);
    this.handleOnPasswordChange       = this.handleOnPasswordChange.bind(this);
    this.handleOnSecretCodeChange     = this.handleOnSecretCodeChange.bind(this);
    this.handleOnSubmit               = this.handleOnSubmit.bind(this);
    this.handleFaceBookSignIn         = this.handleFaceBookSignIn.bind(this);
    this.handleSignUpForm             = this.handleSignUpForm.bind(this);
  }

  handleOnEmailChange(e) {
    const { emailInputChange } = this.props;
    emailInputChange( e.target.value.toLowerCase() );
  }

  handleOnPasswordChange(e) {
    const { passwordInputChange } = this.props;
    passwordInputChange(e.target.value);
  }

  handleOnSecretCodeChange(e){
    const { secretCodeInputChange } = this.props;
    secretCodeInputChange(e.target.value);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { email, password, signInUser } = this.props;
    signInUser({ email, password });
  }

  handleFaceBookSignIn() {
    const { signInUserFacebook, dispatchMessage, secretCode } = this.props;
    if( secretCode === Meteor.settings.public.secretCode) {
      signInUserFacebook();
    } else {
      dispatchMessage('secret code required');
    }
  }

  handleSignUpForm(){
    const { renderForms } = this.props;
    renderForms(false);
  }

  render() {
    const { email, password, message, authenticated, secretCode } = this.props;
    return (
      <div className='signin_container flex_me'>

        {/****** CUSTOM FORM LOGIN ******/}
        <div className='signin_custom_form flex_me'>
          <button className='signin_facebook_btn ' onTouchTap={this.handleFaceBookSignIn}>
            Sign In with Facebook
          </button>
          <input  className="input_signin box_shadow" placeholder='secret code' value={secretCode} onChange={this.handleOnSecretCodeChange} />

          <p className='or'>  - OR - </p>
          <form onSubmit={this.handleOnSubmit} className="signin_form flex_me">
            <span className='sign_in_message'>{ message }</span>
            <input className='input_signin box_shadow' type='email' value={email} placeholder='email' onChange={this.handleOnEmailChange} required/>
            <input className='input_signin box_shadow' type='password' value={password} placeholder='password'
              onChange={this.handleOnPasswordChange} required/>
            <p className='forgot_password'> Forgot password?</p>
            <button className='signin_submit_btn' type='submit'>Sign in</button>
          </form>
          <p className='btn_create_account' onClick={this.handleSignUpForm}> create an account </p>
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({auth}) => {
  const { email, password, message, authenticated, secretCode } = auth;
  return { email, password, message, authenticated, secretCode };
}

export default connect(mapStateToProps, actions)(SignInFormContainer);

// {/****** FACEBOOK PREBUILT LOGIN ******/}
// <div className='signin_facebook_form flex_me'>
//   <LoginButtons visible/>
// </div>
