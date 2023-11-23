// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0tpFRfJFyPrK6l53MZdIRpsuGqn0QvaI",
  authDomain: "leaning-app-44e50.firebaseapp.com",
  databaseURL: "https://leaning-app-44e50-default-rtdb.firebaseio.com",
  projectId: "leaning-app-44e50",
  storageBucket: "leaning-app-44e50.appspot.com",
  messagingSenderId: "350824271071",
  appId: "1:350824271071:web:a356a0eeb06f065d96ad6a",
  measurementId: "G-QBQ9VMRGQR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export {database}