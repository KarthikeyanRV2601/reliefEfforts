import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAwHuOHtkMlGQ0LbjMKd8ODwcjgGyNE5SI",
  authDomain: "reliefefforts-a3296.firebaseapp.com",
  projectId: "reliefefforts-a3296",
  storageBucket: "reliefefforts-a3296.appspot.com",
  messagingSenderId: "725915327973",
  appId: "1:725915327973:web:fe60213b70ec714a2b230c"
})

export const auth = app.auth()
export default app
