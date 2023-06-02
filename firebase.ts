import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS6ufsB537hX2dfwlsC7cFQ_rXDVqqkrA",
  authDomain: "chatgpt-messenger-98de6.firebaseapp.com",
  projectId: "chatgpt-messenger-98de6",
  storageBucket: "chatgpt-messenger-98de6.appspot.com",
  messagingSenderId: "348488562053",
  appId: "1:348488562053:web:05d6296b98ffc91d1880ec"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };