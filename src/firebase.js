// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABWYewuJKN3JIAVeXJjgKpHYOi-mvDtu0",
  authDomain: "twin-galaxies.firebaseapp.com",
  databaseURL: "https://twin-galaxies-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "twin-galaxies",
  storageBucket: "twin-galaxies.firebasestorage.app",
  messagingSenderId: "158860191422",
  appId: "1:158860191422:web:ce59b39ec7fe2f9f6f60ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;