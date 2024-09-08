// Firebase Config Setup
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBfvSfk_GowsTbPoBXl6b0EtUoEW9obwkY",
  authDomain: "kanban-board-9bfc1.firebaseapp.com",
  projectId: "kanban-board-9bfc1",
  storageBucket: "kanban-board-9bfc1.appspot.com",
  messagingSenderId: "839491458094",
  appId: "1:839491458094:web:2db79cbbe9c9ca7ec47bbf",
  measurementId: "G-XBC5J4GK39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore
