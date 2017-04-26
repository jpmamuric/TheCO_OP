import React from 'react'
import { createContainer } from 'meteor/react-meteor-data';

import NominationsForm   from '../containers/nominations/NominationsForm';
import NominatationsList from '../containers/nominations/NominationsList';

import './pages.css'

const NominatePage = (props) => {
  const { user } = props;
  return (
    <div className='page_nominate flex_me'>
      <NominationsForm user={user}/>
      <NominatationsList />
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('userData');
  return { user: Meteor.users.find({}).fetch() };
}, NominatePage);
