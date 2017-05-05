import React from 'react'
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import NominationsForm   from '../containers/nominations/NominationsForm';
import NominatationsList from '../containers/nominations/NominationsList';


import './pages.css'

const NominatePage = (props) => {
  const { isAdmin } = props;
  return (
      <div className='page_nominate flex_me'>
        {
          isAdmin
          ? null
          : <NominationsForm />
        }
        <NominatationsList />
      </div>
  );
}

const mapStateToProps = ({ auth }) => {
  const { isAdmin } = auth;
  return { isAdmin };
}

export default connect(mapStateToProps)( NominatePage);
