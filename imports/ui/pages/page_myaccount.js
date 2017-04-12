import React from 'react'
import { connect } from 'react-redux';

import UserContainer from '../containers/accounts/UserContainer'
import './pages.css';

const MyAccountPage = (props) => {
  const { isAdmin } = props;
  return (
    <div className='page_myaccount flex_me'>
      { isAdmin ? <div> welcome back ADMIN </div> : <UserContainer />}
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  const { isAdmin } = auth;
  return { isAdmin };
}

export default connect(mapStateToProps)(MyAccountPage);
