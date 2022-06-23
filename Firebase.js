// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLiSpsfdKeWu5E5O0r-Mr1V8MWt13IUIw",
  authDomain: "to-do-list-54b2d.firebaseapp.com",
  projectId: "to-do-list-54b2d",
  storageBucket: "to-do-list-54b2d.appspot.com",
  messagingSenderId: "274381118654",
  appId: "1:274381118654:web:59fa581c2ec6dd2facd2ef",
  measurementId: "G-6CMRGEFC9L"
};

// Initialize Firebase
let app 
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig)
} 
else {
  app = getApps()
}

const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}