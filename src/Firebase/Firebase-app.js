// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClaUmsdghQD1e-503pu1o9oFZBMg2IAD8",
  authDomain: "stock-tracker-517a5.firebaseapp.com",
  projectId: "stock-tracker-517a5",
  storageBucket: "stock-tracker-517a5.appspot.com",
  messagingSenderId: "470017070457",
  appId: "1:470017070457:web:1d6433ead8aae40d4b4ba8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


export const auth=getAuth(app)