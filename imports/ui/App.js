import React, { Component } from 'react'
import { connect }          from 'react-redux'

import * as actions from './redux/actions/auth'

//Components
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import Header               from './containers/header/Header.js';

class App extends Component  {
  componentWillMount(){
    const { runAdminCheck } = this.props;
    runAdminCheck()
  }

  componentWillReceiveProps(){
    const { runAdminCheck } = this.props;
    runAdminCheck()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
