import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Authentication extends Component {

    //like state, context is so powerful you must declare context first before using
    //static gives acccess to class level properties, i.e static contextTypes = Authentication.contextTypes


    componentWillMount(){
      if (!this.props.authenticated){
        browserHistory.push('/signin');
      }
    }

    componentWillUpdate(nextProps){
      if(!nextProps.authenticated) {
        browserHistory.push('/signin');
      }
    }

    render(){
      // console.log(this.props.authenticated);
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  function mapStateToProps(state){
    return { authenticated: state.auth.authenticated};
  }

  return connect(mapStateToProps)(Authentication);
}
