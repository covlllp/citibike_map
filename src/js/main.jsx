import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from 'js/data/reducers';
import { routes } from 'js/routes';

import 'scss/styles.scss';

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">{routes}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-content'),
);
