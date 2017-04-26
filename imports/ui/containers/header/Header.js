import React , { Component } from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router'

import * as actions          from '../../redux/actions/auth.js';
import ClockContainer        from '../clock/ClockContainer';
import Drawer                from 'material-ui/Drawer';
import FlatButton            from 'material-ui/FlatButton';
import './Header.css';

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleNavStateReset = this.handleNavStateReset.bind(this);
    this.renderSignInForm = this.renderSignInForm.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  renderSignInForm(){
    const { renderForms } = this.props;
    renderForms(true);
  }

  handleToggle() {
    const { resetStateOnNavigation, resetNominationForm } = this.props;
    !this.state.open ? this.setState({ open: true }) : this.setState({ open: false });
    resetStateOnNavigation();
    resetNominationForm();
  }

  handleNavStateReset(){
    const { resetStateOnNavigation, resetNominationForm } = this.props;
    resetStateOnNavigation();
    resetNominationForm();
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
          <Link className='header_link' to='/myaccount'onClick={this.handleNavStateReset}>Dashboard</Link>
          <Link className='header_link' to='/nominate' onClick={this.handleNavStateReset}>Nominate</Link>
          <Link className='header_link' to='/vote' onClick={this.handleNavStateReset}>Vote</Link>
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
    const { authenticated, isAdmin} = this.props;
    return (
      <div className='header_container flex_me'>

        {/* AppBar Header */}
        <div className='header_logo flex_me'>
          <img className='header_menu' src={'/images/menu.png'} onClick={this.handleToggle}/>
          <Link className='header_link' to='/myaccount' onClick={this.handleNavStateReset}> The Co_op </Link>
          <ClockContainer />
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
            {
              isAdmin
              ? <Link className='sidebar_link' to='/admin' onTouchTap={this.handleToggle}>Admin</Link>
              : null
            }
            {
              !authenticated
              ? null
              : <Link className='sidebar_link' to='/nominate' onTouchTap={this.handleToggle}>Nominate</Link>
            }

            {
              !authenticated
              ? null
              : <Link className='sidebar_link' to='/vote' onTouchTap={this.handleToggle}>Vote</Link>
            }

            {
              !authenticated
              ? null
              : <Link className='sidebar_link' to='/myaccount' onTouchTap={this.handleToggle}>Dashboard</Link>
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
