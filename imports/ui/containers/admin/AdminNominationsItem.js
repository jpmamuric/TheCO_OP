import React, { Component }   from 'react'
import { connect }            from 'react-redux';

import * as actions         from '../../redux/actions/nominations';

import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import './AdminPoll.css';

class AdminNominationItem extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleUnConfirm = this.handleUnConfirm.bind(this)
    this.handleOnTouchTap = this.handleOnTouchTap.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNominationDelete = this.handleNominationDelete.bind(this);
  }

  handleConfirm(){
    const { _id } = this.props.nomination;
    const { vetNomination } = this.props;
    console.log( ' attempinting to vet item' );

    vetNomination(_id);
    this.setState({ open: false })
  }

  handleUnConfirm(){
    const { _id } = this.props.nomination;
    const { unVetNomination } = this.props;
    console.log( 'attempinting to unvet item');
    unVetNomination(_id);
    this.setState({ open: false });
  }

  handleOnTouchTap(){
    this.setState({ open: true });
  }

  handleClose(){
      this.setState({ open: false });
  }

  handleNominationDelete(){
    const { _id } = this.props.nomination;
    console.log( _id );
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
    const { open } = this.state;
    const { name, websiteUrl, vetted, fullName, totalVotes, description } = this.props.nomination;
    return (
      <div>
        {
          vetted
          ? (
            <div className='admin_nomination_list_item flex_me admin_nomination_vetted'>
              <div>
                <p>{ name }</p>
                <p>{ websiteUrl }</p>
              </div>
              <div>{ totalVotes }</div>
              <div className='admin_nomination_remove_list_item flex_me' onTouchTap={this.handleOnTouchTap}> view </div>
            </div>
          )
          : (
            <div className='admin_nomination_list_item flex_me'>
              <div>
                <p>{ name }</p>
                <p>{ websiteUrl }</p>
              </div>
              <div className='admin_nomination_remove_list_item flex_me' onTouchTap={this.handleOnTouchTap}> view </div>
            </div>
          )
        }

        <Dialog
          title={`${name}`}
          actions={actions}
          modal={true}
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div>
            <p><span className='admin_warning_options'>Editing this item </span></p>

            <button onClick={this.handleConfirm}>Confirm</button>
            <button onClick={this.handleUnConfirm}>UnConfirm</button>
            <div>POSTED BY: {fullName}</div>
            <div>WEBSITE: {websiteUrl}</div>
            <div>TOTAL VOTES: {totalVotes}</div>
            <div>DESCRITION:
              <div>
                {description}
              </div>
            </div>

            <div><span className='admin_warning_options'>Warning</span></div>
            <div>Deleting this item cannot be undone</div>
            <button onClick={this.handleNominationDelete}>Delete</button>
          </div>
        </Dialog>

      </div>


    );
  }
}

export default connect(null, actions)(AdminNominationItem);
