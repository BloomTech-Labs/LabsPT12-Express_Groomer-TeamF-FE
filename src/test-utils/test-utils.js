import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Import your own reducer
import configureStore from 'redux-mock-store';
import reducer from '../state/reducers/index';
import thunk from 'redux-thunk';

// The mocked redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function render(
  ui,
  { initialState, store = createStore(reducer, {}), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
