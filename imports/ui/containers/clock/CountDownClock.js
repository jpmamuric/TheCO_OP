import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions         from '../../redux/actions/polls';
import './ClockContainer.css'

class CountDownClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    this.getDeadline = this.getDeadline.bind(this);
    this.leading0    = this.leading0.bind(this);
  }

  componentWillMount(){
    const { deadline, disableVoting} = this.props;
    this.getDeadline(deadline)
    if(( Date.parse(deadline) - Date.parse( new Date() )) <= 0 ) {
      disableVoting();
    }
  }

  componentDidMount(){
    setInterval( () => this.getDeadline(this.props.deadline), 1000 );
  }

  getDeadline(deadline) {
    const Time = Date.parse(deadline) - Date.parse( new Date() );
    const Seconds = Math.floor( (Time/1000) % 60 );
    const Minutes = Math.floor( (Time/1000/60) % 60 );
    const Hours   = Math.floor( Time/(1000*60*60) % 24 );
    const Days    = Math.floor( Time/(1000*60*60*24) )

    if( Time <= 0 ) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      this.setState({ days: Days, hours: Hours, minutes: Minutes, seconds: Seconds });
    }

  }

  leading0(num){
    if ( num < 10 ) {
      return '0' + num;
    }
    return num;
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className='clock_countdown flex_me'>
        <div className='clock_countdown_item'>{ this.leading0(days) } Days </div>
        <div className='clock_countdown_item'>{ this.leading0(hours) } Hours </div>
        <div className='clock_countdown_item'>{ this.leading0(minutes) } Minutes</div>
        <div className='clock_countdown_item'>{ this.leading0(seconds) } Seconds </div>
      </div>
    );
  }
}

export default connect(null, actions)(CountDownClock);
