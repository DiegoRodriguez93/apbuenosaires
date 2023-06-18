import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { getFirestore } from 'redux-firestore';

import rootReducer from './reducers/rootReducers';

export const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirestore })));
