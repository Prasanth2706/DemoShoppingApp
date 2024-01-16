  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import 'firebase/compat/firestore';

  const firebaseConfig = {
    apiKey: 'AIzaSyA_LCpSS3QWWZvLwta4CPLhNywO7zA_nWI',
    authDomain: 'shopping-app-39fba.firebaseapp.com',
    databaseURL: 'https://shopping-app-39fba-default-rtdb.firebaseio.com/',
    projectId: 'shopping-app-39fba',
    storageBucket: 'shopping-app-39fba.appspot.com',
    messagingSenderId: '1065860148109',
    appId: '1:1065860148109:web:9fe2c3c12320d8d389ebc4',
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebaseApp.firestore();
  const auth = firebaseApp.firestore();

  export {  auth };
