import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "carevenueai.firebaseapp.com",
  projectId: "carevenueai",
  storageBucket: "carevenueai.firebasestorage.app",
  messagingSenderId: "548937759591",
  appId: "1:548937759591:web:3b3f7d85c74ad2baa38dc2",
  measurementId: "G-HTZ25HQBN8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
