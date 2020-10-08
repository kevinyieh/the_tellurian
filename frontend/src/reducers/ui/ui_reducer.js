import { combineReducers } from 'redux';
import currentCountry from './current_country_reducer';
import modal from './modal_reducer';

export default combineReducers({ 
  modal,
  currentCountry 
})