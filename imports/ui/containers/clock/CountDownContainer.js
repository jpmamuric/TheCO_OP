import React, { Component } from 'react'

import CountDownClock       from './CountDownClock'

class CountDownContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deadline: 'June 1, 2017'
    };
  }

  render() {
    return (
      <div>
        <CountDownClock deadline={this.state.deadline} />
      </div>
    );
  }
}

export default CountDownContainer;
