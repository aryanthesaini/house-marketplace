import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxZRs-sA-8ZtP9n7DIz0eXUCnSjozwIIs',
  authDomain: 'house-marketplace-app-57062.firebaseapp.com',
  projectId: 'house-marketplace-app-57062',
  storageBucket: 'house-marketplace-app-57062.appspot.com',
  messagingSenderId: '307690974879',
  appId: '1:307690974879:web:8c91f0bb39dd4a5d187caa',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
