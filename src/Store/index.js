// this is store

import reducers from './Reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCShyniHFY7pAtQ5Kri-i_JXTFEOxXqOl0",
  authDomain: "interns-682d4.firebaseapp.com",
  databaseURL: "https://interns-682d4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "interns-682d4",
  storageBucket: "interns-682d4.appspot.com",
  messagingSenderId: "686910410128",
  appId: "1:686910410128:web:ec8e8807bd5b04ab9cb715",
  measurementId: "G-G682GP4CCD"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);

export default store;