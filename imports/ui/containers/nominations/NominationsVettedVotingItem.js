import React, { Component } from 'react'
import { connect }          from 'react-redux';

import * as actions         from '../../redux/actions/nominations';

import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import './Nominations.css';

class NominationsVettedVotingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleOpen(){
    this.setState({ open: true });
  }

  handleClose(){
    this.setState({ open: false });
  }

  handleVote(){
    const { _id } = this.props.nominee;
    this.props.voteNomination(_id)
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const { name, websiteUrl, description, fullName, vetted } = this.props.nominee;
    return (
      <div className="nomination_vetted_list_container flex_me ">
        {
          vetted
          ? <div className='nomination_vetted_list_item flex_me box_shadow' onTouchTap={this.handleOpen}> { name } </div>
          : null
        }

        <Dialog
          title={`${name}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <div>
          { vetted ? <div className='nomintation_vetted'> Vetted </div> : null }
          <div >Posted By: <span className='nomination_postedby'>{ fullName }</span></div>
          <div >Website: <span>{ websiteUrl }</span></div>
          <p>Description: { description }</p>
          <button onTouchTap={this.handleVote}> vote </button>
        </div>

        </Dialog>
       </div>
    );
  }
}

export default connect(null, actions)(NominationsVettedVotingItem);
