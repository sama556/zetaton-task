
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC7TYoRUrDhz2DUQcO6igVrLfj96gUC_TM',
  authDomain: 'zetaton-task-dc0d5.firebaseapp.com',
  projectId: "zetaton-task-dc0d5",
  storageBucket: "zetaton-task-dc0d5.appspot.com",
  messagingSenderId: "562687132462",
  appId: "1:562687132462:web:da622ca94192e0fc3170bf",
  measurementId: "G-Y48469S5VJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
