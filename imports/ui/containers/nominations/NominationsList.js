import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Nominations } from '../../../api/collections/nominations';
import NominationItem  from './NominationItem';

const NominationsList = (props) => {
  const { nominations } = props;
  // console.log(polls)

  return (
    <div className='nomination_list flex_me'>
      <h3> My Nominations </h3>
      {
        nominations.map(nomination => <NominationItem key={nomination._id} nomination={nomination} />)
      }
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('nominations');
  return { nominations: Nominations.find({}).fetch() };
}, NominationsList);
