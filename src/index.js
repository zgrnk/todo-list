import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import TodoIndex from './components/todo_index';
import SignUp from './components/signup';
import Login from './components/login';
import NewItem from './components/new_item';
import ShowItem from './components/show_item';
import EditItem from './components/edit_item';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/user/signup" component={SignUp} />
          <Route path="/user/login" component={Login} />
          <Route path="/items/new" component={NewItem} />
          <Route path="/items/edit/:id" component={EditItem} />
          <Route path="/items/:id" component={ShowItem} />
          <Route path="/" component={TodoIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
