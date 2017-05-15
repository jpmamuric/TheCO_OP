import React, { Component } from 'react';
import { createContainer }  from 'meteor/react-meteor-data';

import { Countdowns }       from '../../../api/collections/countdowns';
import AdminPollItem        from './AdminPollItem';

import './AdminPoll.css';

class AdminCountdownContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({ date: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ date: '' });
    console.log('submitted date')
  }


  render() {
    const { countdowns } = this.props;
    const { date } = this.state;
    // console.log(countdowns)
    return (
      <div className='admin_countdown_container'>
        <form>
          <div>change date of: {date}</div>
          <input onChange={this.handleChange} className='input_signin' placeholder={date} value={this.state.date}/>
          <button className='signin_submit_btn' onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default createContainer( () => {
  Meteor.subscribe('countdowns');
  return { countdowns: Countdowns.find({}).fetch() };
}, AdminCountdownContainer);
