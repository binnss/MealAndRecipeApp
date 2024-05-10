import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvwGXMcR7qZFm6cPkW0jWbHz9y1N6Z37o",
    authDomain: "mealandrecipefinal.firebaseapp.com",
    projectId: "mealandrecipefinal",
    storageBucket: "mealandrecipefinal.appspot.com",
    messagingSenderId: "75626807481",
    appId: "1:75626807481:web:00a42d3740b27c15bc9b68",
    measurementId: "G-M22D9JSKGT"
  };

  // Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);