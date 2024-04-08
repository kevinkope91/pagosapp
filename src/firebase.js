import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh4DdeAnib2ucMT8-5GHTKg9iRIdJQ4S0",
  authDomain: "app-payer.firebaseapp.com",
  projectId: "app-payer",
  storageBucket: "app-payer.appspot.com",
  messagingSenderId: "132999692112",
  appId: "1:132999692112:web:9e2984aba8aa079c793655"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db
