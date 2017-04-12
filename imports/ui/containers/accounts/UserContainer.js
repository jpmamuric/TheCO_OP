import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import HowItWorks   from '../../components/HowItWorksComponent/HowItWorks'
import PaymentForm  from '../payments/PaymentForm'
import './UserContainer.css';

const UserContainer = (props) => {
  const { user } = props;
  console.log(user)
  return (
    <div className='user_container flex_me'>
      {
        user.map( userData => {
          const { profile, username, _id } = userData;
          { /* render if user signs up with meteor*/ }
          if(!profile) {
            return (
              <div key={_id}>
                <h1> Welcome, { username }</h1>
                <div>
                  <h3>How It Works</h3>
                  <HowItWorks />
                  <PaymentForm />
                </div>
              </div>
            );
          } else {
            { /* render if user signs up with facebook */ }
            return (
              <div key={_id}>
                <h1> Welcome, { profile.name }</h1>
                <div>
                  <h3>How It Works</h3>
                  <HowItWorks />
                  <PaymentForm />
                </div>
              </div>
            );
          }
        })
      }
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('userData');
  return { user: Meteor.users.find({}).fetch() };
}, UserContainer);