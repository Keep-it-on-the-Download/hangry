import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBsaibDLi7twQitBYvq9AHp5oPyZFHB0eE',
  authDomain: 'hangry-b39ac.firebaseapp.com',
  projectId: 'hangry-b39ac',
  storageBucket: 'hangry-b39ac.appspot.com',
  messagingSenderId: '631873263480',
  appId: '1:631873263480:web:a33f11e1633c385b855a8d',
  measurementId: 'G-GJJ301XBPR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('%cFirebase initialized', 'color: blue');

export default firebase;
