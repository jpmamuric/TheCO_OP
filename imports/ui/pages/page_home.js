import React from 'react'
import { connect } from 'react-redux';

import SignInFormContainer from '../containers/signin/SignInFormContainer';

const HomePage = (props) => {
  const { authenticated } = props;
  if (authenticated) {
    return (
      <div>
        authenticated page
      </div>
    );
  } else {
    return (
      <div>
        un authentiated page
        <SignInFormContainer />
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const { authenticated } = auth;
  return { authenticated };
}

export default connect(mapStateToProps)(HomePage);
