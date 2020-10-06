import { combineReducers } from 'redux';
import errors from './errors/errors_reducer';
import session from './session/session_reducer';

export default combineReducers({
  errors,
  session
});