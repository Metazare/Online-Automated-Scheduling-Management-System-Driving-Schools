// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBENjIfqT98gJzVqVRz-mRSSZY2sySDHqQ",
  authDomain: "metazare-clients.firebaseapp.com",
  projectId: "metazare-clients",
  storageBucket: "metazare-clients.appspot.com",
  messagingSenderId: "812281073106",
  appId: "1:812281073106:web:b3c45b93c266544db14c0b",
  measurementId: "G-YD22KF4W0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)