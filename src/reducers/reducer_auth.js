import _ from 'lodash';
import {LOGGING_IN, LOGGED_IN, NOT_LOGGED_IN,
  SIGNING_UP, SIGNED_UP, NOT_SIGNED_UP,
  LOGGING_OUT,LOGGED_OUT, NOT_LOGGED_OUT,
} from '../actions';

  // has more fields, but these are only ones I care about
  const USER_TEMPLATE = {
    username: null,
    _id: null,
  }

  const INIT_STATE = {
    user: USER_TEMPLATE,
    loading: false,
    error: '',
  };

export default function(state=INIT_STATE, action) {
  switch(action.type) {

    case LOGGING_IN:
    case SIGNING_UP:
    case LOGGING_OUT:
      return {...state, loading: true};

    case LOGGED_IN:
    case SIGNED_UP:
      // console.log('user -> ', action.user);
      return {...state, loading: false, user: action.user};

    case NOT_LOGGED_IN:
    case NOT_SIGNED_UP:
    case NOT_LOGGED_OUT:
    return {...state, ...INIT_STATE, error: action.error};

    case LOGGED_OUT:
      return {...state, loading: false, user: USER_TEMPLATE}

    default:
      return state;
  }
}
