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
    const { name , websiteUrl, fullName, description, createNomination, user } = this.props;
    const userName = user[0];

    if( fullName === userName.profile.name ) {
      e.preventDefault();
      this.setState({ messageSubmit: '', fullNameClass: 'input_signin' });
      createNomination({ name , websiteUrl, fullName, description });
    } else {
      e.preventDefault();
      this.setState({ messageSubmit: 'please use correct full name', fullNameClass: 'input_fullname_error'});
      return null;
    }
  }


  render() {
    const { name, websiteUrl, fullName, description, nominationNameInputChange, nominationWebsiteUrlInputChange, nominationDescriptionInputChange, nominationFullNameInputChange, message} = this.props;

    const { messageSubmit, fullNameClass } = this.state;
    return(
      <div className='nomination_container flex_me'>
          <h3>
            Tell us about who you want nominate and why?
          </h3>

          <form className='signin_custom_form flex_me' onSubmit={this.handleSubmit}>
            <input className='input_signin' placeholder='enter a name' value={name} onChange={e=>nominationNameInputChange(e.target.value)} required/>
            <input className='input_signin' placeholder='enter website url' value={websiteUrl} onChange={e=>nominationWebsiteUrlInputChange(e.target.value)} required/>
            <input className={`${fullNameClass}`} placeholder='enter full name' value={fullName} onChange={e=>nominationFullNameInputChange(e.target.value)} required/>
            <textarea className='admin_form_textarea_description' value={description} placeholder='enter description' onChange={e=>nominationDescriptionInputChange(e.target.value)} required/>
            { !messageSubmit || messageSubmit === '' ? null:  <p className='submit_error'>{messageSubmit}</p>  }
            { !message || message === '' ? null: <p>{message}</p> }
            <button className='nomination_submit_btn' type='submit'>Submit for Review</button>
          </form>
      </div>

    );
  }
}

const mapStateToProps = ({ nominations }) => {
  const { name, websiteUrl, fullName, description, message } = nominations;
  return { name, websiteUrl,fullName, description, message };
}

export default connect(mapStateToProps, actions)(NominationsForm);
