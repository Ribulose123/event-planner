// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYgyeMiYRkCy8NVPtJWS53MKyn4judJLA",
  authDomain: "event-d7dc3.firebaseapp.com",
  projectId: "event-d7dc3",
  storageBucket: "event-d7dc3.firebasestorage.app",
  messagingSenderId: "461599577651",
  appId: "1:461599577651:web:aa2acba870915c8ae07546",
  measurementId: "G-LNG69CPRHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage()