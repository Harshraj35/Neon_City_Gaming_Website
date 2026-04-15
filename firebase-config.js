// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfRPuoXcq0_UvycdwfD1f7HMoj5Z7eboI",
  authDomain: "neongamewebsite.firebaseapp.com",
  projectId: "neongamewebsite",
  storageBucket: "neongamewebsite.firebasestorage.app",
  messagingSenderId: "554169625015",
  appId: "1:554169625015:web:a04363241c7fe2b19fe032",
  measurementId: "G-168CY68PQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
