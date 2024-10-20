// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAilAnGx9hAlY8goGzgaaFTJAShbQluscA",
  authDomain: "hack49-3e467.firebaseapp.com",
  projectId: "hack49-3e467",
  storageBucket: "hack49-3e467.appspot.com",
  messagingSenderId: "984340008811",
  appId: "1:984340008811:web:97512821a42eff6a09462e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
