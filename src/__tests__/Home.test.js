import React from 'react';

// Component imports
import { HomePage } from '../components/pages/Home';
import { LoadingComponent } from '../components/common';
import { BrowserRouter as Router } from 'react-router-dom';

// Redux imports
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { postUserId, postProfile } from './../state/actions/userActions';

// Testing imports
// import { render } from './../test-utils/test-utils';
import {
  render,
  cleanup,
  wait,
  waitFor,
  configure,
} from '@testing-library/react';

afterEach(cleanup);

// Mock Okta auth hook
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: () => Promise.resolve({ name: 'sara', sub: '0xabc123' }),
      },
    };
  },
}));

// Mock the redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

// Mock user actions
jest.mock('./../state/actions/userActions');

describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', async () => {
    const { findByText, getByText, queryByText } = render(
      <Provider store={store}>
        <Router>
          <HomePage
            LoadingComponent={() => (
              <LoadingComponent message="...fetching profile" />
            )}
          />
        </Router>
      </Provider>
    );
    let loader = getByText(/...fetching profile/i);
    expect(loader).toBeInTheDocument();
  });
});
