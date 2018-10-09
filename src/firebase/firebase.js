import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD4X7d-EgUqy-FRa56_RpxIGuNrkqlhPDc",
  authDomain: "guesser-game.firebaseapp.com",
  databaseURL: "https://guesser-game.firebaseio.com",
  projectId: "guesser-game",
  storageBucket: "guesser-game.appspot.com",
  messagingSenderId: "659326131681"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  }
  
const auth = firebase.auth();

export {
  auth,
}