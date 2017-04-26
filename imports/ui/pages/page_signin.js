import React        from 'react'
import { connect }  from 'react-redux';

import SignInFormContainer from '../containers/signin/SignInFormContainer.js'
import SignUpFormContainer from '../containers/signup/SignUpFormContainer';

import './pages.css';

const SignInPage = (props) => {
  const { isSignin } = props;
  return (
    <div className='page_signin flex_me'>
      {
        isSignin ? <SignInFormContainer /> : <SignUpFormContainer />
      }
    </div>
  );
}

const mapStateToProps = ({auth}) => {
  const { isSignin } = auth;
  return { isSignin };
}

export default connect(mapStateToProps)(SignInPage);
