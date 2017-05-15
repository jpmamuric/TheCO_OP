import React from 'react';

import './Polls.css'

const PollWinnerContainer = () => {
  return (
    <div className='poll_winner_container'>
      Congratulations the winner is ... <span> "WINNER NAME HERE" </span>
      <p> All monthly subscriptions payments will be donated to the winning organization. </p>
    </div>
  )
}

export default PollWinnerContainer;
