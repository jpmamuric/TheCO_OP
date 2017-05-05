import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './Polls.css';

import * as actions          from '../../redux/actions/polls';

class PollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submitVote: false,
      submitMessage: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(){
     this.setState({ open: true });
  }

  handleClose(){
    this.setState({ open: false, submitVote: false, submitMessage: '' })
  }

  handleVote() {
    const { fetchIpAddress, votePoll } = this.props;
    const { _id, title } = this.props.poll;

    //Vote for Poll
    votePoll( _id, title );

    //Fetch Ip address so voter may oly vote once
    fetchIpAddress();
    this.setState({ open: false, submitVote: true, submitMessage: 'You have submitted Vote'})

  }

  render() {
    const { title, description } = this.props.poll;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <div className='poll_list_item flex_me box_shadow' onClick={this.handleOpen}>
          <h4>{title}</h4>
        </div>
        <Dialog
          title={`${title}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <div className='iframe_modal'> Video Goes Here</div>

        { description }
        <div>
          <button onTouchTap={this.handleVote}> Vote Now </button>
        </div>

        </Dialog>

        <Dialog
          title={`Congratulations!`}
          actions={actions}
          modal={true}
          open={this.state.submitVote}
          onRequestClose={this.handleClose}
        >
        Thank you for voting.
        </Dialog>
      </div>
    );
  }
}

export default connect( null, actions)(PollItem);

// <iframe src="http://www.youtube.com/embed/W7qWa52k-nE" className='iframe_modal'
//   frameBorder="0" allowFullScreen></iframe>
