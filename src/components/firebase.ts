// Firebase imports
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/performance';

/* Firebase configuration
   Enter your own configuration details after creating a Firebase project
*/
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

// Firebase initialization
const app = firebase.initializeApp(firebaseConfig);

// Authentication
export const auth = app.auth();

// Firestore
export const firestore = app.firestore();

// Storage
export const storage = app.storage();

// Performance
export const performance = app.performance();
