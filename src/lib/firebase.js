import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Eksik olan içe aktarma işlemi

const firebaseConfig = {
  apiKey: "AIzaSyDcmzNAQG2XL0PoICrlQ1V89KKVVPtzuiw",
  authDomain: "laser-cut-a4862.firebaseapp.com",
  projectId: "laser-cut-a4862",
  storageBucket: "laser-cut-a4862.firebasestorage.app",
  messagingSenderId: "760480846593",
  appId: "1:760480846593:web:76aea0b4bb5e68dccb4100",
  measurementId: "G-YPYENW8RJP"
};

// Firebase uygulamasını başlat
const firebaseApp = initializeApp(firebaseConfig);

// Authentication, Firestore ve Storage için instance'ları dışa aktar
export const auth = getAuth(firebaseApp); // Firebase Auth modülü kullanımı
export const db = getFirestore(firebaseApp); // Firestore kullanımı
export const storage = getStorage(firebaseApp); // Storage kullanımı
export default firebaseApp;
