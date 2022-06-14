import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT9wExVASQyrMGn2jR_nTb2oDnQpjnqlI",
  authDomain: "budget-planner-e9ee8.firebaseapp.com",
  projectId: "budget-planner-e9ee8",
  storageBucket: "budget-planner-e9ee8.appspot.com",
  messagingSenderId: "344444706092",
  appId: "1:344444706092:web:35607db3852c7390992089"
};

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

export {firebase, auth};