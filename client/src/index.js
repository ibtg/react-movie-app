import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleWare from 'redux-promise';
import Reduxthunk from 'redux-thunk';
import Reducer from './_reducers';
import { BrowserRouter } from 'react-router-dom';

const createStoreWithMiddleWare = applyMiddleware(
  promiseMiddleWare,
  Reduxthunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleWare(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


