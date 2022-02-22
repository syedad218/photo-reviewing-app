// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWpn0s71_rgkHaV4MA3E20mq14pfepEwk",
  authDomain: "photo-reviewing-app.firebaseapp.com",
  projectId: "photo-reviewing-app",
  storageBucket: "photo-reviewing-app.appspot.com",
  messagingSenderId: "770764784820",
  appId: "1:770764784820:web:2191d4ea457e581e7f03e1",
  measurementId: "G-MDPYH39V0C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
