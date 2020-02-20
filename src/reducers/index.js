import { combineReducers } from "redux";
import trackers from './trackers';
import { reducer as form } from 'redux-form';

export default combineReducers({
  trackers,
  form,
});