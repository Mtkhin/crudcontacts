import firebase from  "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
    apiKey: "AIzaSyC7hCZ1SxhtuNeGLean4BUHIulo-6W9MRA",
    authDomain: "crud-contacts-eacb4.firebaseapp.com",
    databaseURL: "https://crud-contacts-eacb4-default-rtdb.firebaseio.com",
    projectId: "crud-contacts-eacb4",
    storageBucket: "crud-contacts-eacb4.appspot.com",
    messagingSenderId: "237527873078",
    appId: "1:237527873078:web:dc48f59f79dd4b830cca97"
  };
  
  // Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();