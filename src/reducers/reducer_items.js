import _ from 'lodash';
import {FETCH_POSTS, DELETE_ITEM,
    FETCH_ITEMS, LOGGED_OUT,
} from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case FETCH_ITEMS:
      return _.mapKeys(action.items, '_id');

    case LOGGED_OUT:
      return {};

    case DELETE_ITEM:
      return _.omit(state, action.id);

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');

    default:
      return state;
  }
}
