import React, { Component } from 'react';
import { connect }          from 'react-redux';

import * as actions         from '../../redux/actions/nominations';
import './Nominations.css';

class NominationsForm extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    const { name , websiteUrl } = this.props;
    e.preventDefault();
    console.log('submitted for review', name , websiteUrl );
  }

  render() {
    const { name , websiteUrl, nominationNameInputChange, nominationWebsiteUrlInputChange } = this.props;
    return(
      <div className='nomination_container flex_me'>
          <h2>
            Tell us about who you want nominate and why?
          </h2>

          <form className='signin_custom_form flex_me' onSubmit={this.handleSubmit}>
            <input className='input_signin' placeholder='enter a name' value={name} onChange={e=>nominationNameInputChange(e.target.value)}/>
            <input className='input_signin' placeholder='enter website url' value={websiteUrl} onChange={e=>nominationWebsiteUrlInputChange(e.target.value)}/>
            <button className='nomination_submit_btn' type='submit'>Submit for Review</button>
          </form>
      </div>

    );
  }
}

const mapStateToProps = ({ nominations }) => {
  const { name, websiteUrl } = nominations;
  return { name, websiteUrl };
}

export default connect(mapStateToProps, actions)(NominationsForm);
