import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions         from '../../redux/actions/nominations';
import './Nominations.css';

class NominationsForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      messageSubmit: '',
      fullNameClass: 'input_signin'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { name , websiteUrl, description, createNomination } = this.props;
    const fullName = Meteor.user().profile.name;
    createNomination({ name , websiteUrl, fullName, description });


  // Name Authentication System
    // if( fullName === Meteor.user().username || fullName === Meteor.user().profile.name ) {
    //   e.preventDefault();
    //   this.setState({ messageSubmit: '', fullNameClass: 'input_signin' });
    //
    // } else {
    //   e.preventDefault();
    //   this.setState({ messageSubmit: 'please use correct full name', fullNameClass: 'input_fullname_error'});
    //   return null;
    // }
  }


  render() {
    const { name, websiteUrl, description, nominationNameInputChange, nominationWebsiteUrlInputChange, nominationDescriptionInputChange, message, disablePolls} = this.props;

    const { messageSubmit, fullNameClass } = this.state;

    if (disablePolls) {
      return <div> Nominations are now closed. </div>
    } else {
      return(
        <div className='nomination_container flex_me'>
            <h3>
              Tell us about who you want nominate and why?
            </h3>

            <form className='signin_custom_form flex_me' onSubmit={this.handleSubmit}>
              <input className='input_signin' placeholder='enter an organization name' value={name} onChange={e=>nominationNameInputChange(e.target.value)} required/>
              <input className='input_signin' placeholder='enter website url' value={websiteUrl} onChange={e=>nominationWebsiteUrlInputChange(e.target.value)} required/>
              <textarea className='admin_form_textarea_description' value={description} placeholder='enter description' onChange={e=>nominationDescriptionInputChange(e.target.value)} required/>
              { !messageSubmit || messageSubmit === '' ? null:  <p className='submit_error'>{messageSubmit}</p>  }
              { !message || message === '' ? null: <p>{message}</p> }
              <button className='nomination_submit_btn' type='submit'>Submit for Review</button>
            </form>
        </div>

      );
    }
  }
}

const mapStateToProps = ({ nominations, polls }) => {
  const { disablePolls } = polls;
  const { name, websiteUrl, description, message } = nominations;
  return { name, websiteUrl, description, message, disablePolls };
}

export default connect(mapStateToProps, actions)(NominationsForm);
