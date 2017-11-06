import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './app';
import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';

const reducers = combineReducers({});
export const store = createStore(reducers);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);