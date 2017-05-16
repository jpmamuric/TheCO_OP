import React, { Component }   from 'react';
import { connect }            from 'react-redux';

import * as actions         from '../../redux/actions/countdown';

class AdminCountdownForm extends Component {
  constructor(props) {
    super(props);

    this.state = { date: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ date: e.target.value })
  }

  handleSubmit(e) {
    const countdownId = this.props.countdowns[0]._id
    const { date } = this.state;
    e.preventDefault();
    this.setState({ date: '' });

    if ( date === '' || date === NaN ) {
      return null;
    } else {
      this.props.updateCountdownDate(countdownId , date );
    }
  }

  render(){
    const { countdowns, message } = this.props;
    const countdownDate = countdowns.map( countdown => countdown.date );
    const { date } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Change Countdown Date of: {countdownDate}</div>
        <input onChange={this.handleChange} className='input_signin' placeholder={countdownDate} value={date}/>
        <button className='signin_submit_btn' onClick={this.handleSubmit}>Submit</button>
        { !message || message === '' ? null: <p>{message}</p> }
      </form>
    );
  }
}

const mapStateToProps = ({ countdown }) => {
  const { message } = countdown;
  return { message };
}

export default connect(mapStateToProps, actions)(AdminCountdownForm);
