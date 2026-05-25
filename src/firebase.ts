// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLvdX8ABpBY8fItmU_vgd22_8q4aHiLw8",
  authDomain: "goaldex-whatsapp.firebaseapp.com",
  projectId: "goaldex-whatsapp",
  storageBucket: "goaldex-whatsapp.firebasestorage.app",
  messagingSenderId: "896202203851",
  appId: "1:896202203851:web:cd7c3307683fd21e84314e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);