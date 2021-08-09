import {combineReducers} from 'redux';
import {signUpStore} from './signUp';

// combine reducers to build the state
const appReducer = combineReducers({
  signUpStore,
  // other reducers scalable
});

export default appReducer;
