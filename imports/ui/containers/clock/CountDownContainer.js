import React, { Component } from 'react'
import { createContainer }  from 'meteor/react-meteor-data';

import { Countdowns }       from '../../../api/collections/countdowns';
import CountDownClock       from './CountDownClock'

class CountDownContainer extends Component {
  render() {
    const { countdowns } = this.props;
    if(countdowns.length === 0 ) {
      return <div> Loading ... </div>
    } else {
      return <CountDownClock deadline={countdowns[0].date} />
    }
  }
}

export default createContainer( () => {
  Meteor.subscribe('countdowns');
  return { countdowns: Countdowns.find({}).fetch() };
}, CountDownContainer);
