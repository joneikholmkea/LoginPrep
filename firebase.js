// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd4BUZOn4A4qj2BHAlfdb6wIK9JVjBNq8",
    authDomain: "myproject-9d62a.firebaseapp.com",
    projectId: "myproject-9d62a",
    storageBucket: "myproject-9d62a.appspot.com",
    messagingSenderId: "581965378722",
    appId: "1:581965378722:web:58d8ef7f3f868a759cd3fb"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { database, app }