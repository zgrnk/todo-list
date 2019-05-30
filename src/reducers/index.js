import { combineReducers } from 'redux';
import ItemsReducer from './reducer_items';
import AuthReducer from './reducer_auth';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  items: ItemsReducer,
  profile: AuthReducer,
  form: formReducer,
});

export default rootReducer;
