// Import firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_LCpSS3QWWZvLwta4CPLhNywO7zA_nWI",
  authDomain: "shopping-app-39fba.firebaseapp.com",
  databaseURL: "https://shopping-app-39fba-default-rtdb.firebaseio.com",
  projectId: "shopping-app-39fba",
  storageBucket: "shopping-app-39fba.firebasestorage.app",
  messagingSenderId: "1065860148109",
  appId: "1:1065860148109:web:9fe2c3c12320d8d389ebc4"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore
const db = firebase.firestore();

export { db };