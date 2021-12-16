// Firebase imports
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/performance';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBz6fLHNftOXGJXGLshODEUbRKzB2_dsCc",
    authDomain: "bma-texas-missions-mcms.firebaseapp.com",
    databaseURL: "https://bma-texas-missions-mcms-default-rtdb.firebaseio.com",
    projectId: "bma-texas-missions-mcms",
    storageBucket: "bma-texas-missions-mcms.appspot.com",
    messagingSenderId: "568320621902",
    appId: "1:568320621902:web:391ebe53e2bcc52eba721f",
    measurementId: "G-RQT1DNRDWT"
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