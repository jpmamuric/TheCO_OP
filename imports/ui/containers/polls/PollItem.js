import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './Polls.css';

class PollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
     this.setState({ open: true });
  }

  handleClose(){
    this.setState({ open: false })
  }

  render() {
    const { title, description } = this.props.poll;
    const { open } = this.state;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <div className='poll_list_item flex_me box_shadow' onClick={this.handleOnClick}>
          <h4>{title}</h4>
        </div>
        <Dialog
          title={`${title}`}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
        >
        { description }
        </Dialog>
      </div>
    );
  }
}

export default PollItem;
