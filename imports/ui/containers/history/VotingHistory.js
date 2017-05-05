import React        from 'react'
import { connect }  from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data';

import { VotingHistory }   from '../../../api/collections/history';

import VotingHistoryItem   from './VotingHistoryitem';

const VotingHistoryContainer = (props) => {
  const { history } = props;
  console.log(history)
  return (
    <div>
      <div>
        I voted for:
      </div>
      <div>
        {
          history.map( item => <VotingHistoryItem key={item._id} item={item} /> )
        }
      </div>
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('votingHistory');
  return { history: VotingHistory.find({}).fetch() };
}, VotingHistoryContainer);

// {
//   history.map(item => <div key={item}>{item}</div>)
// }
