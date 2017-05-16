import React, { Component } from 'react';
import { createContainer }  from 'meteor/react-meteor-data';

import { Countdowns }       from '../../../api/collections/countdowns';
import AdminCountdownForm   from './AdminCountdownForm';
import AdminPollItem        from './AdminPollItem';

import './AdminPoll.css';

const AdminCountdownContainer = (props) => {
  const { countdowns } = props;
  return (
    <div className='admin_countdown_container'>
      <AdminCountdownForm countdowns={countdowns}/>
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('countdowns');
  return { countdowns: Countdowns.find({}).fetch() };
}, AdminCountdownContainer);
