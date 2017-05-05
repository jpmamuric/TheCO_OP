import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions         from '../../redux/actions/polls'
import './AdminPoll.css'

class AdminPollForm extends Component {
  constructor(props){
    super(props);
    this.state = { message: '' };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
  }

  handleOnSubmit(e){
    const { title, description, createPoll } = this.props
    e.preventDefault();
    createPoll({ title, description });
  }

  handleTitleOnChange(e){
    const { titleInputChange } = this.props;
    titleInputChange(e.target.value)
  }

  render(){
    const { title, description, descriptionInputChange, submitMessage } = this.props;
    const { message } = this.state;
    return (
      <div>
        <h3> Add Top 4 Organizations here </h3>
        <form onSubmit={this.handleOnSubmit} className='admin_poll_form flex_me'>
          <input className='input_signin' value={title} placeholder='title' onChange={this.handleTitleOnChange} required/>
          <textarea className='admin_form_textarea_description' value={description} placeholder='description' onChange={e=>descriptionInputChange(e.target.value)} required/>
          { !message || message === '' ? null: <p>{message}</p>}
          { submitMessage !== '' ? <p> { submitMessage }</p>: null}
          <button className='signin_submit_btn' type='submit'>Submit</button>
        </form>
      </div>
    );
  }

}

const mapStateToProps = ({ polls }) => {
  const { title, description, submitMessage } = polls;
  return { title, description, submitMessage };
}

export default connect(mapStateToProps, actions)(AdminPollForm);
