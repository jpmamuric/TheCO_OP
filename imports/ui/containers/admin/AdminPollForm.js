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
    const { title, description} = this.props
    e.preventDefault();

    if ( title !== '' && description !== '') {
      Meteor.call('addPoll',  { title, description } , (err, res)=> {
        if (err) {
          console.log(err);
          this.setState({ message: 'error creating poll' });
        } else {
          console.log('success!')

          //add action here to reset title and desciption on success
          this.setState({ message: 'Success' });
        }
      });
    }

  }

  handleTitleOnChange(e){
    const { titleInputChange } = this.props;
    titleInputChange(e.target.value)
  }

  render(){
    const { title, description, descriptionInputChange } = this.props;
    const { message } = this.state;
    return (
      <div>
        { !message || message === '' ? null: <p>{message}</p>}
        <form onSubmit={this.handleOnSubmit} className='admin_poll_form flex_me'>
          <input className='input_signin' value={title} placeholder='title' onChange={this.handleTitleOnChange} required/>
          <textarea className='admin_form_textarea_description' value={description} placeholder='description' onChange={e=>descriptionInputChange(e.target.value)} required/>
          <button className='signin_submit_btn' type='submit'>Submit</button>
        </form>
      </div>
    );
  }

}

const mapStateToProps = ({ polls }) => {
  const { title, description } = polls;
  return { title, description };
}

export default connect(mapStateToProps, actions)(AdminPollForm);
