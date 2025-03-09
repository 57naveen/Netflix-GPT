// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYiLRKlaNV_uT81S5NnvQM80nHAGW9BcA",
  authDomain: "netflixgpt-242ef.firebaseapp.com",
  projectId: "netflixgpt-242ef",
  storageBucket: "netflixgpt-242ef.firebasestorage.app",        
  messagingSenderId: "487806831235",
  appId: "1:487806831235:web:7a2930f3985b64c98069b6",
  measurementId: "G-2LYFTEBGY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();