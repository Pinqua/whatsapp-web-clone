import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoZcS0Pwr0QAddLW8j5wyRrdbJWnECyik",
  authDomain: "whatsapp-web-clone-a8d93.firebaseapp.com",
  databaseURL: "https://whatsapp-web-clone-a8d93.firebaseio.com",
  projectId: "whatsapp-web-clone-a8d93",
  storageBucket: "whatsapp-web-clone-a8d93.appspot.com",
  messagingSenderId: "830002031050",
  appId: "1:830002031050:web:3772d26aa86981b099c733",
  measurementId: "G-687Y7YYCPP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
