import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDMOOdGbE8kvf9zKDewOCo3lBNmrQXl91A",
  authDomain: "instagram-clone-ffc62.firebaseapp.com",
  databaseURL: "https://instagram-clone-ffc62.firebaseio.com",
  projectId: "instagram-clone-ffc62",
  storageBucket: "instagram-clone-ffc62.appspot.com",
  messagingSenderId: "29701043031",
  appId: "1:29701043031:web:17ae0bb3bb58009d49c412",
  measurementId: "G-N5GNS4YDD5",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
