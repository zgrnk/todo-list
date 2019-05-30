import _ from 'lodash';
import axios from 'axios';

export const FETCH_ITEMS = 'fetch_items';
export const DELETE_ITEM = 'delete_post';

export const LOGGING_IN = 'logging_in';
export const LOGGED_IN = 'logged_in';
export const NOT_LOGGED_IN = 'not_logged_in';

export const SIGNING_UP = 'signing_up';
export const SIGNED_UP = 'signed_up';
export const NOT_SIGNED_UP = 'not_signed_up';

export const LOGGING_OUT = 'logging_out';
export const LOGGED_OUT = 'logged_out';
export const NOT_LOGGED_OUT = 'not_logged_out';

export const logout = () => {
  return (dispatch) => {
    dispatch({type: LOGGING_OUT});
    axios.post('http://localhost:5000/api/logout', {withCredentials: true})
      .then(resp => {
        if (resp.data.message === 'Success') {
          dispatch({type: LOGGED_OUT});
        } else {
          dispatch({type: NOT_LOGGED_OUT, error: resp});
          alert("Error logging out somehow! ", `${resp}` );
        }
      })
      .catch(error => {
        dispatch({type: NOT_LOGGED_OUT, error});
        alert("Error logging out somehow! ", `${error}` );
      });
  };
};

export const signup = (data, callback) => {
  const {username, password} = data;
  // console.log('signup deets', username, password);

  return (dispatch) => {
    dispatch({type: SIGNING_UP});
    axios.post('http://localhost:5000/api/signup', {username, password}, {withCredentials: true})
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data.hasOwnProperty('message')) {
            dispatch({type: NOT_SIGNED_UP, error: resp.data.message});
            alert(resp.data.message);
          } else if (resp.data.hasOwnProperty('username')) {

            /// THIS IS WHAT SHOULD HAPPEN!!!
            dispatch({
              type: SIGNED_UP,
              user: resp.data});
            callback();

          } else {
            dispatch({type: NOT_SIGNED_UP, error: resp.data});
            alert("Unexpected resp signing up! ");
            console.log("no sign up", resp);
          }
        } else {
          dispatch({type: NOT_SIGNED_UP, error: resp.data});
          alert("Unexpected resp status signing up! ");
          console.log("no sign up", resp);
        }
      })
      .catch(error => {
        console.log('err: ', error);
        dispatch({type: NOT_SIGNED_UP, error});
        alert("Error signing up! ", `${error}` );
      });
  };
};

export const login = (data, callback) => {
  const {username, password} = data;
  // console.log('login deets', username, password);

  return (dispatch) => {
    dispatch({type: LOGGING_IN});
    axios.post('http://localhost:5000/api/login', {username, password}, {withCredentials: true})
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data.hasOwnProperty('message')) {
            dispatch({type: NOT_LOGGED_IN, error: resp.data.message});
            alert(resp.data.message);
          } else if (resp.data.hasOwnProperty('username')) {

            /// THIS IS WHAT SHOULD HAPPEN!!!
            dispatch({
              type: LOGGED_IN,
              user: resp.data});
            callback();

          } else {
            dispatch({type: NOT_LOGGED_IN, error: resp.data});
            alert("Unexpected resp logging in! ");
            console.log("no login", resp);
          }
        } else {
          dispatch({type: NOT_LOGGED_IN, error: resp.data});
          alert("Unexpected resp status logging in! ");
          console.log("no login", resp);
        }
      })
      .catch(error => {
        console.log('err: ', error);
        dispatch({type: NOT_LOGGED_IN, error});
        alert("Error loggin in! ", `${error}` );
      });
  };
};


export const fetchUsersItems = (uid) => {
  return (dispatch) => {
    axios.get('http://localhost:5000/api/tasks', {withCredentials: true})
      .then(resp => {
        if (resp.status === 200) {
          // console.log(resp);
          if (resp.data.hasOwnProperty('message')) {
            alert(resp.data.message);
          } else if (Array.isArray(resp.data)) {
            const myItems = resp.data.filter(itm => itm.owner === uid);
            // console.log(myItems);
            dispatch({type: FETCH_ITEMS, items: myItems});
          } else {
            console.log('Unexpected fetch response?', resp);
          }
        } else {
          console.log('bad fetch response?', resp);
        }
      })
      .catch(error => {
        console.log('not got items: ', error);
      });
  };
};

export const createItem = (values, callback) => {
  return (dispatch) => {
    axios.post('http://localhost:5000/api/tasks/create', {...values}, {withCredentials: true})
      .then( resp => {
        if (resp.status === 200) {
          // console.log('create data has data?', resp)
          if (resp.data.hasOwnProperty('message')) {
            alert(resp.data.message);
          } else if (resp.data.hasOwnProperty('createdAt')) {
            // console.log('created? no show?', resp.data);
            // dispatch({type: ITEM_CREATED});
            callback();

          } else {
            console.log('item not created??', resp);
          }
        }
      })
      .catch(err => console.log('create item error', err));
  };
};

export const deleteItem = (id, callback) => {
  return (dispatch) => {
    axios.post(`http://localhost:5000/api/tasks/delete/${id}`, {withCredentials: true})
      .then(resp => {
        // console.log(resp);
        callback();
        dispatch({type: DELETE_ITEM, id: resp.data._id});
      })
      .catch(err => console.log('could not delete post!', resp));
  };
};

export const editItem = (values, id, callback) => {
  const {title, description} = values;
  console.log('before edit', values, id)
  return (dispatch) => {
    axios.post(`http://localhost:5000/api/tasks/edit/${id}`, {title, description}, {withCredentials: true})
      .then(resp => {
        console.log(resp);
        callback();
        // dispatch({type: EDIT_ITEM, id: resp.data._id});
      })
      .catch(err => console.log('could not delete post!', err));
  };
};
