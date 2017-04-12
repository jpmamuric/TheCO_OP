import { combineReducers } from 'redux';

import auth     from './reducer_auth';
import polls    from './reducer_polls';
import payment  from './reducer_payment';

const rootReducer = combineReducers({
  auth,
  polls,
  payment
});

export default rootReducer;
