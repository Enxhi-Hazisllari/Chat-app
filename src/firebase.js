// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "enxhi-chat-6a04f.firebaseapp.com",
  projectId: "enxhi-chat-6a04f",
  storageBucket: "enxhi-chat-6a04f.appspot.com",
  messagingSenderId: "731179700263",
  appId: "1:731179700263:web:ba9ff4c710d287fb02be02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();