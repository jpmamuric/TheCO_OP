import { combineReducers } from 'redux';

import auth         from './reducer_auth';
import polls        from './reducer_polls';
import nominations  from './reducer_nominations';
import payment      from './reducer_payment';
import youtube      from './reducer_youtube';

const rootReducer = combineReducers({
  auth,
  polls,
  nominations,
  payment,
  youtube 
});

export default rootReducer;
