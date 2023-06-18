import 'firebase/compat/firestore';

import { FC, ReactNode } from 'react';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import { store } from '../redux/store';

import { firebaseConfig } from './../firebase/config';

const reactReduxFirebaseConfig = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const app = firebase.initializeApp(firebaseConfig);
firebase.firestore();

export const storage = getStorage(app);

type ReactReduxFirebaseContextProviderType = {
  children: ReactNode;
};

export const ReactReduxFirebaseContextProvider: FC<ReactReduxFirebaseContextProviderType> = ({ children }) => (
  <ReactReduxFirebaseProvider {...reactReduxFirebaseConfig}>{children}</ReactReduxFirebaseProvider>
);
