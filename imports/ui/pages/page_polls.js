import React from 'react'

import PollListContainer from '../containers/polls/PollListContainer'


const PollsPage = () => {
  return (
    <div className='page_polls flex_me'>
      <PollListContainer />
    </div>
  );
}

export default PollsPage;
