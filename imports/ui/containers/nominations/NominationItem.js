import React, { Component } from 'react';
import { connect }          from 'react-redux'

import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import './Nominations.css'

import * as actions         from '../../redux/actions/nominations';

class NominationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false,
      openDelete: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRemoveItemOpen = this.handleRemoveItemOpen.bind(this)
    this.handleNominationDelete = this.handleNominationDelete.bind(this)
  }

  handleClose(){
    this.setState({ openDetails: false, openDelete: false })
  }

  handleOnClick(){
    this.setState({ openDetails: true });
  }

  handleRemoveItemOpen() {
    this.setState({ openDelete: true });
  }

  handleNominationDelete(){
    const { _id } = this.props.nomination;
    const { removeNomination } = this.props;
    removeNomination(_id);
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    const { openDetails, openDelete } = this.state
    const { name, websiteUrl, description, fullName } = this.props.nomination;
    return (
      <div className='nomination_list_item flex_me box_shadow' >
        <div >
          <div>{name}</div>
          <div>{websiteUrl}</div>
        </div>
        <div className='nomination_btns_container flex_me'>
          <div className='nomination_list_view_item' onClick={this.handleOnClick}> View </div>
          <div className='nomination_list_remove_item' onClick={this.handleRemoveItemOpen}> X </div>
        </div>

        <Dialog
          title={`${name}`}
          actions={actions}
          modal={true}
          open={openDetails}
          onRequestClose={this.handleClose}
        >
        <div>
          <div>Posted By: { fullName }</div>
          <div>Website: { websiteUrl }</div>
          <p>Description: { description }</p>
        </div>

        </Dialog>

        <Dialog
          title={`Warning, about to delete: ${name}`}
          actions={actions}
          modal={true}
          open={openDelete}
          onRequestClose={this.handleClose}
        >
          <div>
            <p>Delete this item? Cannot be undone</p>
            <button onClick={this.handleNominationDelete}>Delete</button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, actions)(NominationItem);
