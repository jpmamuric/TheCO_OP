import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Authentication extends Component {
    componentWillMount(){
      const { isAdmin } = this.props;
      if ( isAdmin === false ){
        browserHistory.push('/signin');
      }
    }

    componentWillUpdate(nextProps){
      const { isAdmin } = this.props;
      if( isAdmin === false) {
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

  const mapStateToProps = ({auth}) => {
    const { isAdmin } = auth;
    return { isAdmin };
  }

  return connect(mapStateToProps)(Authentication);
}
