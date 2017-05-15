import React, { Component } from 'react';
import { connect }          from 'react-redux'

import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import './Nominations.css'

import * as actions         from '../../redux/actions/nominations';

class NominationItemVetted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openVettedDetails: false,
      openVettedDelete: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRemoveItemOpen = this.handleRemoveItemOpen.bind(this)
  }

  handleClose(){
    this.setState({ openVettedDetails: false, openVettedDelete: false })
  }

  handleOnClick(){
    this.setState({ openVettedDetails: true });
  }

  handleRemoveItemOpen() {
    this.setState({ openVettedDelete: true });
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const { openVettedDetails, openVettedDelete } = this.state
    const { name, websiteUrl, description, fullName, vetted } = this.props.nominee;
    return (
      <div className='nomination_list_item flex_me box_shadow' >
        <div >
          <div>{name}</div>
          <div className='nomination_list_item_url'>{websiteUrl}</div>
        </div>
        <div className='nomination_btns_container flex_me'>
          <div className='nomination_list_view_item' onClick={this.handleOnClick}> View </div>
        </div>

        <Dialog
          title={`${name}`}
          actions={actions}
          modal={true}
          open={openVettedDetails}
          onRequestClose={this.handleClose}
        >
        <div>
          { vetted ? <div className='nomintation_vetted'> Vetted </div> : null }
          <div>Posted By: <span className='nomination_postedby'>{ fullName }</span></div>
          <div>Website: {websiteUrl}</div>
          <p>Description: { description }</p>
        </div>
        </Dialog>

      </div>
    );
  }
}

export default connect(null, actions)(NominationItemVetted);
