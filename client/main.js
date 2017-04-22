import React                            from 'react';
import { Meteor }                       from 'meteor/meteor';
import { render }                       from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory }       from 'react-router';
import thunk                            from 'redux-thunk';
import { composeWithDevTools }          from 'redux-devtools-extension';
import { Provider }                     from 'react-redux';
import routes                           from './routes';
import reducers                         from '../imports/ui/redux/reducers/index.js';
import * as types                       from '../imports/ui/redux/actions/types.js';
import injectTapEventPlugin             from 'react-tap-event-plugin';
injectTapEventPlugin();

//import collections here to use Meteor Methods
import  { Polls }  from '../imports/api/collections/polls';
import  { Nominations }  from '../imports/api/collections/nominations';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

const User = localStorage.getItem('Meteor.userId');

if (User) {
  store.dispatch( {type: types.SIGNIN_USER_SUCCESS, payload: true });
}

if(Meteor.isClient) {
  Stripe.setPublishableKey(Meteor.settings.public.StripePublishable);
  Meteor.startup(() => {
    render(
        <Provider store={store}>
          <Router history={browserHistory} routes={routes} />
        </Provider>,
      document.getElementById('render-target'));
  });
}
