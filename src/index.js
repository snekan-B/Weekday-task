import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import Reducers from './reducers/Reducers';

/**
 * Added redux for state management.
 * Added store configuration with redux-thunk as middleware.
 * redux-thunk is used for asynchronous calls.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(Reducers,compose(applyMiddleware(thunk)))
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
);
