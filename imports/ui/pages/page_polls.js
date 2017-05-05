import React from 'react'

import NominationsVettedVotingList from '../containers/nominations/NominationsVettedVotingList'
import PollListContainer from '../containers/polls/PollListContainer'


const PollsPage = () => {
  return (
    <div className='page_polls flex_me'>
      <PollListContainer />
      <NominationsVettedVotingList />
    </div>
  );
}

export default PollsPage;
