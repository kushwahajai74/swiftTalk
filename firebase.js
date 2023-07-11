import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3iR216vQPmMswJvtr5RSFJIXjSQYoJVo",
  authDomain: "swifttalk-c51a2.firebaseapp.com",
  projectId: "swifttalk-c51a2",
  storageBucket: "swifttalk-c51a2.appspot.com",
  messagingSenderId: "1006458028274",
  appId: "1:1006458028274:web:1b7984fa6477031173906b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
