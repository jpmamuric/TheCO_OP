import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Nominations } from '../../../api/collections/nominations';
import NominationsVettedVotingItem from './NominationsVettedVotingItem'
import './Nominations.css';

const NominationsVettedVotingList = (props) => {
  const { vetted } = props;
  return (
    <div className='vetted_voting_container flex_me'>
      <div>
        <h1> Everyones Vetted Nominations</h1>
      </div>
      <div className='vetted_voting_list flex_me'>
        {
         vetted.map( nominee => <NominationsVettedVotingItem key={nominee._id} nominee={nominee}/> )
        }
      </div>
    </div>
  );
}


export default createContainer( () => {
  Meteor.subscribe('nominationsAll');
  return { vetted: Nominations.find({ }).fetch() };
}, NominationsVettedVotingList);
