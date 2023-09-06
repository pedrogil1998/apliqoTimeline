// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqpWvn2OWwiNgAx2TaEEACsfhpE2nWAXI",
  authDomain: "apliqo-timeline.firebaseapp.com",
  databaseURL:
    "https://apliqo-timeline-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "apliqo-timeline",
  storageBucket: "apliqo-timeline.appspot.com",
  messagingSenderId: "685801543857",
  appId: "1:685801543857:web:57d02f2d34103e88b46a90",
  measurementId: "G-E2DS1JW874",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase();
