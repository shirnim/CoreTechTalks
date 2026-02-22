// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoBDyohNc1a6YrqiCqN1YTzE1l-jzGR4g",
  authDomain: "gen-lang-client-0543721435.firebaseapp.com",
  projectId: "gen-lang-client-0543721435",
  storageBucket: "gen-lang-client-0543721435.firebasestorage.app",
  messagingSenderId: "453963475855",
  appId: "1:453963475855:web:871bc28f88d62690a679fa",
  measurementId: "G-Y459CDRK76"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);