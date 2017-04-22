import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './AdminPoll.css';

class AdminPollItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleDelete(id) {
    const { _id } = this.props.poll;
    Meteor.call( 'removePoll', _id );
    this.setState({ open: false });
  }

  render() {
    const { title } = this.props.poll;
    const { open } = this.state;
    const actions = [
      <FlatButton
        label='Cancel'
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        className='admin_delete_btn'
        onTouchTap={this.handleDelete}
      />
    ];

    return (
      <div className='admin_poll_list_item flex_me'>
        {title}
        { !open ? <button onClick={this.handleOpen}> X </button>: null }
        <Dialog
          title="Delete Warning!"
          actions={actions}
          modal={true}
          open={open}
        >
          Permanantly remove poll named <span className='admin_delete_poll_title'>{ title }</span> from database?
        </Dialog>
      </div>
    );
  }
}

export default AdminPollItem;
