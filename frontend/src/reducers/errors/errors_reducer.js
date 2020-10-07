import { combineReducers } from "redux";
import session from "./session_errors_reducer";
import country from './countries_errors_reducer';

export default combineReducers({
  session,
  country
});
