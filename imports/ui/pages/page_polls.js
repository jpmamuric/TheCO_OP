import React from 'react'
import { connect } from 'react-redux';

import NominationsVettedVotingList from '../containers/nominations/NominationsVettedVotingList'
import PollListContainer from '../containers/polls/PollListContainer'


const PollsPage = (props) => {
  const { disablePolls } = props;

  if(disablePolls) {
    return (
      <div className='page_polls flex_me'>
        Nominations Are Now Over
      </div>
    );
  } else {
    return (
      <div className='page_polls flex_me'>
        <NominationsVettedVotingList />
      </div>
    );
  }
}

const mapStateToProps = ({ polls }) => {
  const { disablePolls } = polls;
  return { disablePolls };
}

export default connect(mapStateToProps)(PollsPage);


// <PollListContainer />
