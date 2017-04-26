import React               from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls }      from '../../../api/collections/polls';
import AdminPollItem  from './AdminPollItem';

const AdminPollListContainer = (props) => {
  const { polls } = props;
  // console.log(polls)
  return (
    <div className='admin_poll_list'>
      {
        polls.map(poll=> <AdminPollItem key={poll._id} poll={poll}/>)
      }
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('polls');
  return { polls: Polls.find({}).fetch() };
}, AdminPollListContainer);
