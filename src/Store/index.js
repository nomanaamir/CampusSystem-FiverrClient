// this is store

import reducers from './Reducers/index';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAAtW4PMAZBgg6NthZZxvz-mkuZu6Ke2yM",
    authDomain: "campussystem-f057e.firebaseapp.com",
    databaseURL: "https://campussystem-f057e-default-rtdb.firebaseio.com",
    projectId: "campussystem-f057e",
    storageBucket: "campussystem-f057e.appspot.com",
    messagingSenderId: "792352184001",
    appId: "1:792352184001:web:1823217ce1a93c1c17e640"
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