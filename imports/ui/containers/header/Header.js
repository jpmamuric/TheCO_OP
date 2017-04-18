import React , { Component } from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router'

import * as actions          from '../../redux/actions/auth.js';

import Drawer                from 'material-ui/Drawer';
import FlatButton            from 'material-ui/FlatButton';
import './Header.css';

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };

    this.renderSignInForm = this.renderSignInForm.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  renderSignInForm(){
    const { renderForms } = this.props;
    renderForms(true);
  }

  handleToggle() {
    const { resetStateOnNavigation } = this.props;
    !this.state.open ? this.setState({ open: true }) : this.setState({ open: false });
    resetStateOnNavigation();
  }

  handleLogout(){
    const { signOutUser } = this.props;
    signOutUser();
    this.setState({ open: false });
  }

  renderLinks(){
    const { authenticated, isAdmin } = this.props;
    if (authenticated) {
      return (
        <div className='header_links flex_me'>
          {
            isAdmin
            ? <Link className='header_link' to='/admin'>Admin</Link>
            : null
          }
          <Link className='header_link' to='/myaccount'>Dashboard</Link>
          <Link className='header_link' to='/polls'>Polls</Link>
          <div
            className='btn_logout header_link' onTouchTap={this.handleLogout}>
            Logout
          </div>
        </div>
      );
    } else {
      return (
        <div className='header_links'>
          <Link className='header_link' to='/signin' onClick={this.renderSignInForm}> Sign in</Link>
        </div>
      );
    }
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className='header_container flex_me'>

        {/* AppBar Header */}
        <div className='header_logo flex_me'>
          <img className='header_menu' src={'/images/menu.png'} onClick={this.handleToggle}/>
          <Link className='header_link' to='/'> The Co_op </Link>
        </div>

        {/* App SideDrawer */}
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={this.handleToggle}
        >

          {/* App Links for SideDrawer Navigation */}
          <div className='sidebar_container flex_me'>
            <Link className='sidebar_link' to='/' onTouchTap={this.handleToggle} >Home</Link>
            {
              !authenticated
              ? null
              : <Link className='sidebar_link' to='/polls' onTouchTap={this.handleToggle}>Polls</Link>
            }

            {
              !authenticated
              ? null
              : <Link className='sidebar_link' to='/myaccount' onTouchTap={this.handleToggle}>Account</Link>
            }

            {
              authenticated
              ? null
              : <Link className='sidebar_link flex_me' to='/signin' onTouchTap={this.handleToggle}>Sign in </Link>
            }

            {
              authenticated
              ? <div className='btn_logout header_link' onTouchTap={this.handleLogout}>Logout</div>
              : null
            }
          </div>
        </Drawer>

        {/* App Links for Appbar Navigation */}
        { this.renderLinks() }
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const { authenticated, isAdmin } = auth;
  return { authenticated, isAdmin};
}

export default connect(mapStateToProps, actions)(Header);
