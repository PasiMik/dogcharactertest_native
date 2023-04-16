import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { getDatabase,} from 'firebase/database';
import {FIREBASE_API} from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API,
    authDomain: "dogcharactertest.firebaseapp.com",
    databaseURL: "https://dogcharactertest-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "dogcharactertest",
    storageBucket: "dogcharactertest.appspot.com",
    messagingSenderId: "1027764083602",
    appId: "1:1027764083602:web:b37dbec8c5f1bf6d323f4b"
  };

  const app = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();

  const database = getDatabase(app);
  
   export {auth};
   export {database};