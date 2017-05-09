import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Home from './components/Home';
import Quote from './components/Quote';
import Layout from './containers/LayoutContainer';
import Login from './containers/LoginContainer';
import * as reducers from './reducers';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const store = createStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

const requireAuth = (nextState, replace) => {
  if (!store.getState().login) {
    replace({
      pathname: '/login',
    });
  }
};

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="quotes" component={Quote} onEnter={requireAuth} />
        <Route path="Login" component={Login} />
      </Route>
    </Router>
  </Provider>
);

export default App;
