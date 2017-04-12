import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../../../api/collections/polls';

import PollItem from  './PollItem';

const PollListContainer = (props) => {
  const { polls } = props;
  // console.log(polls)
  
  return (
    <div className='poll_list flex_me'>
      {
        polls.map(poll => <PollItem key={poll._id} poll={poll} />)
      }
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('polls');
  return { polls: Polls.find({}).fetch() };
}, PollListContainer);
