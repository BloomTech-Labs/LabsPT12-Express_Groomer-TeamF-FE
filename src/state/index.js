import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducers';
import thunk from 'redux-thunk';

// STORE
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
